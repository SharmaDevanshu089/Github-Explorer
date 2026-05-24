import { invoke } from "@tauri-apps/api/core";

async function DisplayFileList(githubUrl: string) {
  const files = invoke("fetch_current_directory", { urlToFind: githubUrl });
  console.log(files);
  return (
    <ul>
        {files.map((file) =>
            <li key={file.name}>{file.name}</li>)}
    </ul>
  )
}

export default DisplayFileList;