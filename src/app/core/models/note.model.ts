import { Tag } from './tag.model';

export interface Note {
    id: number;
    title: string;
    content: string;
    date: string;
    tag?: Tag;
    remark: boolean;
    img: string;
}