use reqwest::Client;
use serde_json::Result;
use tauri::http::{request, response};

#[tauri::command]
pub async fn fetch_current_directory(url_to_find: String) {
    let request_url = url_to_find;
    println!("Fetching URL: {}", request_url);
    let client = Client::new();
    let response = client
        .get(&request_url)
        .header("User-Agent", "GithubExplorer")
        .send()
        .await
        .unwrap();
    let body = response.text().await.unwrap();
    println!("Response body: {}", body);
}
