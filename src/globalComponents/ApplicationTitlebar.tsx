import { useState, useCallback } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import "./ApplicationTitlebar.css";

// ── SVG Icon Components ───────────────────────────────────────────────────────

const MinimizeIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 1" xmlns="http://www.w3.org/2000/svg">
    <rect width="10" height="1" fill="currentColor" />
  </svg>
);

const MaximizeIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 0v10h10V0H0zm9 9H1V1h8v8z"
      fill="currentColor"
    />
  </svg>
);

const RestoreIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3 0v3H0v7h7V7h3V0H3zm6 6H7V3H4V1h5v5zM6 9H1V4h5v5z"
      fill="currentColor"
    />
  </svg>
);

const CloseIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.354.646a.5.5 0 0 0-.708.708L4.293 5 .646 8.646a.5.5 0 0 0 .708.708L5 5.707l3.646 3.647a.5.5 0 0 0 .708-.708L5.707 5l3.647-3.646a.5.5 0 0 0-.708-.708L5 4.293 1.354.646z"
      fill="currentColor"
    />
  </svg>
);

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
      fill="currentColor"
    />
  </svg>
);

// ── Main Component ────────────────────────────────────────────────────────────

function ApplicationTitlebar() {
  const [isMaximized, setIsMaximized] = useState(false);

  const appWindow = getCurrentWindow();

  const handleMinimize = useCallback(async () => {
    await appWindow.minimize();
  }, [appWindow]);

  const handleMaximizeRestore = useCallback(async () => {
    const maximized = await appWindow.isMaximized();
    if (maximized) {
      await appWindow.unmaximize();
      setIsMaximized(false);
    } else {
      await appWindow.maximize();
      setIsMaximized(true);
    }
  }, [appWindow]);

  const handleClose = useCallback(async () => {
    await appWindow.close();
  }, [appWindow]);

  const handleDoubleClick = useCallback(async () => {
    await handleMaximizeRestore();
  }, [handleMaximizeRestore]);

  return (
    <div className="titlebar" data-tauri-drag-region onDoubleClick={handleDoubleClick}>
      {/* ── Left: App identity ── */}
      <div className="titlebar__left" data-tauri-drag-region>
        <div className="titlebar__app-icon">
          {/* <GitHubIcon /> , i think i may or maynot add icon later in this ?*/}
        </div>
        <span className="titlebar__app-name">GitHub Explorer</span>
      </div>


      {/* ── Right: Window controls ── */}
      <div className="titlebar__controls">
        <button
          className="titlebar__btn titlebar__btn--minimize"
          onClick={handleMinimize}
          onMouseDown={(e) => e.stopPropagation()}
          aria-label="Minimize"
          title="Minimize"
        >
          <MinimizeIcon />
        </button>
        <button
          className="titlebar__btn titlebar__btn--maximize"
          onClick={handleMaximizeRestore}
          onMouseDown={(e) => e.stopPropagation()}
          aria-label={isMaximized ? "Restore" : "Maximize"}
          title={isMaximized ? "Restore" : "Maximize"}
        >
          {isMaximized ? <RestoreIcon /> : <MaximizeIcon />}
        </button>
        <button
          className="titlebar__btn titlebar__btn--close"
          onClick={handleClose}
          onMouseDown={(e) => e.stopPropagation()}
          aria-label="Close"
          title="Close"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}

export default ApplicationTitlebar;