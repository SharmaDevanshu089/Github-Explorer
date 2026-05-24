import { invoke } from "@tauri-apps/api/core";

async function displayFileList(githubUrl: string) {
  const files = await invoke("fetch_current_directory", { urlToFind: githubUrl });
  console.log(files);
  return (
    <ul>
        {files.map((file) =>
            <li key={file.name}>{file.name}</li>)}
    </ul>
  )
}

export default displayFileList;