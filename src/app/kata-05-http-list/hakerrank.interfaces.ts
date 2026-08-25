export interface HakerranckResponse {
    page:        number;
    per_page:    number;
    total:       number;
    total_pages: number;
    data:        HakerrankUser[];
}

export interface HakerrankUser {
    id:               number;
    username:         string;
    about:            string;
    submitted:        number;
    updated_at:       Date;
    submission_count: number;
    comment_count:    number;
    created_at:       number;
}
