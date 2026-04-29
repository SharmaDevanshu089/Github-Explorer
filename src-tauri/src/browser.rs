use reqwest::Client;

#[tauri::command]
pub async fn fetch_current_directory(url_to_find: String) -> Result<String, String> {
    let request_url = url_to_find;
    println!("Fetching URL: {}", request_url);
    let client = Client::new();
    let response = client
        .get(&request_url)
        .header("User-Agent", "GithubExplorer")
        .send()
        .await
        .map_err(|e| e.to_string())?;
    let body = response.text().await.map_err(|e| e.to_string())?;
    Ok(body)
}
