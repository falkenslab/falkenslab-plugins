# Captures one window, by part of its title, into a PNG, even when other windows cover it (PrintWindow).
#   powershell -File capture-window.ps1 -Title "docker-mcp-demo" -Out shot.png [-Restore]
# -Restore un-minimizes it first. Launch the terminal with a known title so it can be found, e.g.
#   wt -w new --size 104,42 --title docker-mcp-demo --suppressApplicationTitle cmd /c demo.cmd
param([Parameter(Mandatory)] [string]$Title, [Parameter(Mandatory)] [string]$Out, [switch]$Restore)
Add-Type -AssemblyName System.Drawing
Add-Type @"
using System; using System.Runtime.InteropServices;
public class CaptureWindow {
  [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr h, out R r);
  [DllImport("user32.dll")] public static extern bool PrintWindow(IntPtr h, IntPtr dc, uint f);
  [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr h, int c);
  [DllImport("user32.dll")] public static extern bool SetProcessDPIAware();
  public struct R { public int L, T, Rt, B; }
}
"@
[CaptureWindow]::SetProcessDPIAware() | Out-Null
$p = Get-Process | Where-Object { $_.MainWindowTitle -like "*$Title*" } | Select-Object -First 1
if (-not $p) { throw "No window whose title contains '$Title'." }
if ($Restore) { [CaptureWindow]::ShowWindow($p.MainWindowHandle, 9) | Out-Null; Start-Sleep -Milliseconds 400 }
$r = New-Object CaptureWindow+R
[CaptureWindow]::GetWindowRect($p.MainWindowHandle, [ref]$r) | Out-Null
$w = $r.Rt - $r.L; $h = $r.B - $r.T
if ($w -lt 200) { throw "The window is minimized ($w x $h): use -Restore." }
$bmp = New-Object System.Drawing.Bitmap $w, $h
$g = [System.Drawing.Graphics]::FromImage($bmp); $dc = $g.GetHdc()
[CaptureWindow]::PrintWindow($p.MainWindowHandle, $dc, 2) | Out-Null
$g.ReleaseHdc($dc); $g.Dispose()
$bmp.Save($Out, [System.Drawing.Imaging.ImageFormat]::Png); $bmp.Dispose()
"$Out : $w x $h"
