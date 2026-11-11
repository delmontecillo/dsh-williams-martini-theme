# Clicks a point relative to the visible DeepSeek Harness window, DPI-aware.
param([int]$X, [int]$Y)
Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;
public class Clicker {
  [DllImport("user32.dll")] public static extern bool SetProcessDPIAware();
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
  [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
  [DllImport("user32.dll")] public static extern bool IsIconic(IntPtr hWnd);
  [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr hWnd, out RECT lpRect);
  [DllImport("user32.dll")] public static extern bool SetCursorPos(int x, int y);
  [DllImport("user32.dll")] public static extern void mouse_event(uint flags, uint dx, uint dy, uint data, UIntPtr extra);
  [StructLayout(LayoutKind.Sequential)]
  public struct RECT { public int Left, Top, Right, Bottom; }
}
"@
[void][Clicker]::SetProcessDPIAware()
$candidates = Get-Process -Name "DeepSeek Harness" -ErrorAction Stop | Where-Object {
  $_.MainWindowHandle -ne 0 -and $_.MainWindowTitle -like "*DeepSeek Harness*"
}
if (-not $candidates) { throw "Harness window not found" }

function Select-BestWindow {
  $best = $null
  $bestArea = 0
  $bestRect = $null
  foreach ($c in $candidates) {
    if ([Clicker]::IsIconic($c.MainWindowHandle)) { continue }
    $r = New-Object Clicker+RECT
    [void][Clicker]::GetWindowRect($c.MainWindowHandle, [ref]$r)
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
  [void][Clicker]::ShowWindow($first.MainWindowHandle, 9)
  Start-Sleep -Milliseconds 900
  $picked = Select-BestWindow
}
if (-not $picked) { throw "visible Harness window not found" }

$hwnd = $picked[0].MainWindowHandle
$rect = $picked[1]
[void][Clicker]::SetForegroundWindow($hwnd)
Start-Sleep -Milliseconds 250
[void][Clicker]::SetCursorPos($rect.Left + $X, $rect.Top + $Y)
Start-Sleep -Milliseconds 140
[Clicker]::mouse_event(0x0002, 0, 0, 0, [UIntPtr]::Zero)
Start-Sleep -Milliseconds 70
[Clicker]::mouse_event(0x0004, 0, 0, 0, [UIntPtr]::Zero)
Write-Output "clicked window($X,$Y) -> screen($($rect.Left + $X),$($rect.Top + $Y))"
