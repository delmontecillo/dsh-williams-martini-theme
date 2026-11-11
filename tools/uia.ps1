# UI Automation helper for the DeepSeek Harness window.
#   -List            list every button name
#   -Invoke "Name"   invoke the first button with that accessible name
param([switch]$List, [string]$Invoke)
Add-Type -AssemblyName UIAutomationClient
Add-Type -AssemblyName UIAutomationTypes
$root = [System.Windows.Automation.AutomationElement]::RootElement
$proc = Get-Process -Name "DeepSeek Harness" -ErrorAction Stop | Where-Object { $_.MainWindowHandle -ne 0 } | Select-Object -First 1
$cond = New-Object System.Windows.Automation.PropertyCondition([System.Windows.Automation.AutomationElement]::ProcessIdProperty, $proc.Id)
$win = $root.FindFirst([System.Windows.Automation.TreeScope]::Children, $cond)
if (-not $win) { throw "Harness window not found" }

if ($List) {
  $all = $win.FindAll([System.Windows.Automation.TreeScope]::Descendants, [System.Windows.Automation.Condition]::TrueCondition)
  foreach ($el in $all) {
    if ($el.Current.ControlType.ProgrammaticName -eq 'ControlType.Button') {
      "{0}  [{1}]" -f $el.Current.Name, $el.Current.BoundingRectangle
    }
  }
  exit
}

if ($Invoke) {
  $c = New-Object System.Windows.Automation.PropertyCondition([System.Windows.Automation.AutomationElement]::NameProperty, $Invoke)
  $el = $win.FindFirst([System.Windows.Automation.TreeScope]::Descendants, $c)
  if (-not $el) { throw "button not found: $Invoke" }
  $done = $false
  foreach ($p in $el.GetSupportedPatterns()) {
    if ($p -eq [System.Windows.Automation.InvokePattern]::Pattern) {
      $el.GetCurrentPattern($p).Invoke(); $done = $true; break
    }
    if ($p -eq [System.Windows.Automation.ExpandCollapsePattern]::Pattern) {
      $el.GetCurrentPattern($p).Expand(); $done = $true; break
    }
  }
  if (-not $done) { throw "no invokable pattern on: $Invoke" }
  "invoked: $Invoke"
}
