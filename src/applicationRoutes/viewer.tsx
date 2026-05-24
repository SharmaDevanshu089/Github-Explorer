import { invoke } from "@tauri-apps/api/core";

async function displayFileList(githubUrl: string) {
  const files = await invoke("fetch_current_directory", { urlToFind: githubUrl });
  return (
    <div id="fileAndFolderList">
        {files.map(file) => (
            <ul>
                if (file.type = "file") {
                    <li>File: {file.name}</li>
                }
                else {
                    <li>Folder: {file.name}</li>
                }
                
            </ul>
        )}
    </div>
  )
}