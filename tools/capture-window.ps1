# Captures the visible DeepSeek Harness window with PrintWindow, even when it is
# behind another app. Does not steal focus.
Add-Type -AssemblyName System.Drawing
Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;
public class PwCapture {
  [DllImport("user32.dll")] public static extern bool SetProcessDPIAware();
  [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr hWnd, out RECT lpRect);
  [DllImport("user32.dll")] public static extern bool IsIconic(IntPtr hWnd);
  [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
  [DllImport("user32.dll")] public static extern bool PrintWindow(IntPtr hWnd, IntPtr hdcBlt, uint nFlags);
  [StructLayout(LayoutKind.Sequential)]
  public struct RECT { public int Left, Top, Right, Bottom; }
}
"@

[void][PwCapture]::SetProcessDPIAware()
$candidates = Get-Process -Name "DeepSeek Harness" -ErrorAction Stop | Where-Object {
  $_.MainWindowHandle -ne 0 -and $_.MainWindowTitle -like "*DeepSeek Harness*"
}
if (-not $candidates) { throw "Harness window not found" }

$best = $null
$bestArea = 0
$bestRect = $null
foreach ($c in $candidates) {
  if ([PwCapture]::IsIconic($c.MainWindowHandle)) {
    [void][PwCapture]::ShowWindow($c.MainWindowHandle, 9)
    Start-Sleep -Milliseconds 700
  }
  $r = New-Object PwCapture+RECT
  [void][PwCapture]::GetWindowRect($c.MainWindowHandle, [ref]$r)
  if ($r.Left -lt -10000) { continue }
  $area = ($r.Right - $r.Left) * ($r.Bottom - $r.Top)
  if ($area -gt $bestArea) {
    $best = $c
    $bestArea = $area
    $bestRect = $r
  }
}
if (-not $best) { throw "visible Harness window not found" }

$hwnd = $best.MainWindowHandle
$w = $bestRect.Right - $bestRect.Left
$h = $bestRect.Bottom - $bestRect.Top
$bmp = New-Object System.Drawing.Bitmap $w, $h
$gfx = [System.Drawing.Graphics]::FromImage($bmp)
$hdc = $gfx.GetHdc()
$ok = [PwCapture]::PrintWindow($hwnd, $hdc, 2)
$gfx.ReleaseHdc($hdc)
$gfx.Dispose()
$out = Join-Path $PSScriptRoot "..\preview\app-live.png"
$bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Write-Output "saved $out ${w}x${h} printWindow=$ok"
