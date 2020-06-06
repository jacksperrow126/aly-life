export interface Note {
    id: number;
    title: string;
    content: string;
    createDate: string;
    tags?: string;
    remark: boolean;
    img: string;
}