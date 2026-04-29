use reqwest::Client;
use serde::Deserialize;
use serde::Serialize;

#[derive(Debug, Deserialize, Serialize)]
pub struct RepoContentItem {
    pub name: String,
    pub path: String,
    pub sha: String,
    pub size: u64,
    pub url: String,
    pub html_url: String,
    pub git_url: String,
    pub download_url: Option<String>, // Can be null for directories
    #[serde(rename = "type")]
    pub item_type: String, // Maps the JSON "type" key
    pub _links: Links,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Links {
    #[serde(rename = "self")]
    pub self_link: String, // Maps the JSON "self" key
    pub git: String,
    pub html: String,
}

#[tauri::command]
pub async fn fetch_current_directory(url_to_find: String) -> Result<Vec<RepoContentItem>, String> {
    let request_url = url_to_find;
    println!("Fetching URL: {}", request_url);
    let client = Client::new();
    let response = client
        .get(&request_url)
        .header("User-Agent", "GithubExplorer")
        .send()
        .await
        .map_err(|e| e.to_string())?;
    let repofiles: Vec<RepoContentItem> = response
        .json()
        .await
        .map_err(|_e| "Failed to parse JSON".to_string())?;
    Ok(repofiles)
}
