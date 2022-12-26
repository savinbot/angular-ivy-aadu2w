export interface Projects {
  project_status: boolean;
  $key: string;
  project_name: string;
  project_type: string;
  project_type_link: string;
  telegram_token: string;
  modules: {
    user_count: number
  }
}
