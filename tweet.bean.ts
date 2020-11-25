export interface TweetEntity {
    tweet: Tweet;
}

export interface Tweet {
    retweeted:                  boolean;
    source:                     string;
    entities:                   Entities;
    display_text_range:         string[];
    favorite_count:             string;
    id_str:                     string;
    truncated:                  boolean;
    retweet_count:              string;
    id:                         string;
    created_at:                 string;
    favorited:                  boolean;
    full_text:                  string;
    lang:                       Lang;
    possibly_sensitive?:        boolean;
    extended_entities?:         ExtendedEntities;
    in_reply_to_status_id_str?: string;
    in_reply_to_user_id?:       string;
    in_reply_to_status_id?:     string;
    in_reply_to_screen_name?:   string;
    in_reply_to_user_id_str?:   string;
    withheld_in_countries?:     WithheldInCountry[];
    withheld_copyright?:        boolean;
    isRT: boolean;
    classification?: { // Values gathered by https://github.com/IBM/MAX-Toxic-Comment-Classifier. This field won't be populated until oyu run classifier at least once
        severe_toxic: number;
        obscene: number;
        threat: number;
        insult: number;
        identity_hate: number;
    }
}

export interface Entities {
    hashtags:      Hashtag[];
    symbols:       Hashtag[];
    user_mentions: UserMention[];
    urls:          URL[];
    media?:        Media[];
}

export interface Hashtag {
    text:    string;
    indices: string[];
}

export interface Media {
    expanded_url:           string;
    source_status_id?:      string;
    indices:                string[];
    url:                    string;
    media_url:              string;
    id_str:                 string;
    source_user_id?:        string;
    id:                     string;
    media_url_https:        string;
    source_user_id_str?:    string;
    sizes:                  Sizes;
    type:                   Type;
    source_status_id_str?:  string;
    display_url:            string;
    video_info?:            VideoInfo;
    additional_media_info?: AdditionalMediaInfo;
}

export interface AdditionalMediaInfo {
    title?:           string;
    description?:     string;
    embeddable?:      boolean;
    monetizable:      boolean;
    call_to_actions?: CallToActions;
}

export interface CallToActions {
    visit_site?: VisitSite;
    watch_now?:  VisitSite;
}

export interface VisitSite {
    url: string;
}

export interface Sizes {
    thumb:  Large;
    small:  Large;
    medium: Large;
    large:  Large;
}

export interface Large {
    w:      string;
    h:      string;
    resize: Resize;
}

export enum Resize {
    Crop = "crop",
    Fit = "fit",
}

export enum Type {
    AnimatedGIF = "animated_gif",
    Photo = "photo",
    Video = "video",
}

export interface VideoInfo {
    aspect_ratio:     string[];
    duration_millis?: string;
    variants:         Variant[];
}

export interface Variant {
    bitrate?:     string;
    content_type: ContentType;
    url:          string;
}

export enum ContentType {
    ApplicationXMPEGURL = "application/x-mpegURL",
    VideoMp4 = "video/mp4",
}

export interface URL {
    url:          string;
    expanded_url: string;
    display_url:  string;
    indices:      string[];
}

export interface UserMention {
    name:        string;
    screen_name: string;
    indices:     string[];
    id_str:      string;
    id:          string;
}

export interface ExtendedEntities {
    media: Media[];
}

export enum Lang {
    Ar = "ar",
    CA = "ca",
    CS = "cs",
    Cy = "cy",
    Da = "da",
    De = "de",
    En = "en",
    Es = "es",
    Et = "et",
    Eu = "eu",
    Fi = "fi",
    Fr = "fr",
    HT = "ht",
    Hi = "hi",
    Hu = "hu",
    In = "in",
    Is = "is",
    It = "it",
    Ja = "ja",
    Ko = "ko",
    LV = "lv",
    Lt = "lt",
    Nl = "nl",
    No = "no",
    Pl = "pl",
    Pt = "pt",
    Ro = "ro",
    Ru = "ru",
    Sl = "sl",
    Sv = "sv",
    Tl = "tl",
    Tr = "tr",
    Und = "und",
    Vi = "vi",
    Zh = "zh",
}

export enum WithheldInCountry {
    De = "DE",
    Fr = "FR",
    Xy = "XY",
}
