# Captures the visible DeepSeek Harness window to a PNG for visual verification.
Add-Type -AssemblyName System.Drawing
Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;
public class Win32 {
  [DllImport("user32.dll")] public static extern bool SetProcessDPIAware();
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
  [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
  [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr hWnd, out RECT lpRect);
  [DllImport("user32.dll")] public static extern bool IsIconic(IntPtr hWnd);
  [StructLayout(LayoutKind.Sequential)]
  public struct RECT { public int Left, Top, Right, Bottom; }
}
"@

[void][Win32]::SetProcessDPIAware()
$candidates = Get-Process -Name "DeepSeek Harness" -ErrorAction Stop | Where-Object {
  $_.MainWindowHandle -ne 0 -and $_.MainWindowTitle -like "*DeepSeek Harness*"
}
if (-not $candidates) { throw "Harness window not found" }

function Select-BestWindow {
  $best = $null
  $bestArea = 0
  $bestRect = $null
  foreach ($c in $candidates) {
    if ([Win32]::IsIconic($c.MainWindowHandle)) { continue }
    $r = New-Object Win32+RECT
    [void][Win32]::GetWindowRect($c.MainWindowHandle, [ref]$r)
    if ($r.Left -lt -10000 -or $r.Top -lt -10000) { continue }
    $area = ($r.Right - $r.Left) * ($r.Bottom - $r.Top)
    if ($area -gt $bestArea) {
      $best = $c
      $bestArea = $area
      $bestRect = $r
    }
  }
  if ($best) { return @($best, $bestRect) }
  return $null
}

$picked = Select-BestWindow
if (-not $picked) {
  $first = $candidates | Select-Object -First 1
  [void][Win32]::ShowWindow($first.MainWindowHandle, 9)
  Start-Sleep -Milliseconds 900
  $picked = Select-BestWindow
}
if (-not $picked) { throw "visible Harness window not found" }

$hwnd = $picked[0].MainWindowHandle
$rect = $picked[1]
[void][Win32]::SetForegroundWindow($hwnd)
Start-Sleep -Milliseconds 900
$w = $rect.Right - $rect.Left
$h = $rect.Bottom - $rect.Top
if ($w -le 0 -or $h -le 0) { throw "bad window rect ${w}x${h}" }

$bmp = New-Object System.Drawing.Bitmap $w, $h
$gfx = [System.Drawing.Graphics]::FromImage($bmp)
$gfx.CopyFromScreen($rect.Left, $rect.Top, 0, 0, $bmp.Size)
$gfx.Dispose()
$out = Join-Path $PSScriptRoot "..\preview\app-live.png"
$bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Write-Output "saved $out ${w}x${h} from ($($rect.Left),$($rect.Top))"
