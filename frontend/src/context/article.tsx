import { createContext, ReactNode, useState } from "react";


export interface IArticle {
    title: string;
    text: string;
    author: IAuthorSchema;
    likes: [string];
    comments: [ICommentSchema];
}

export interface IAuthorSchema {
    name: string;
}

export interface ICommentSchema {
    text: string;
    user: string;
    likes: [string];
}

interface IArticleArray {
    article: IArticle[];
    toggleArray: (newArticle: IArticle) => void;
}

export const ArticleContext = createContext({} as IArticleArray)

export const ArticleProvider = ({ children }: { children: ReactNode }) => {

    const [article, setArticle] = useState<IArticle[]>([]);

    const toggleArray = (newArticle: IArticle) => {
        const newArray = [...article, newArticle];
        setArticle(newArray);
    }

    return (
        <>
            <ArticleContext.Provider
                value={{
                    article,
                    toggleArray
                }}
                children={children}
            />
        </>
    )
}