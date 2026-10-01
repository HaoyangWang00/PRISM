export interface BasePageConfig {
    type: 'about' | 'publication' | 'card' | 'text' | 'news';
    title: string;
    description?: string;
}

export interface PublicationPageConfig extends BasePageConfig {
    type: 'publication';
    source: string;
}

export interface NewsPageConfig extends BasePageConfig {
    type: 'news';
    news: { date: string; content: string }[];
}

export interface TextPageConfig extends BasePageConfig {
    type: 'text';
    source: string;
}

export interface CardListItem {
    name: string;  // 期刊/会议名称，例如 "IEEE T-RO"
    date?: string; // 具体时间，例如 "2023 - Present"
}

export interface CardItem {
    title: string;
    subtitle?: string;
    date?: string;
    content?: string;
    tags?: string[];
    link?: string;
    image?: string;
    list?: CardListItem[];
}

export interface CardPageConfig extends BasePageConfig {
    type: 'card';
    layout?: 'grouped' | 'timeline';
    items: CardItem[];
}
