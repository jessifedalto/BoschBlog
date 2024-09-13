import { useEffect, useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableData } from "./styles";
import axios from "axios";

interface IArticle {
    title: string,
    likes: string[]
}

export default function List() {
    const [articles, setArticles] = useState<IArticle[]>([]);

    useEffect(() => {
        fetchArticles();
    }, []);

    async function fetchArticles() {
        try {
            const res = await axios.get("http://localhost:8080/api/article/get");
            const articleList : IArticle[] = res.data.article;
            
            setArticles(articleList);

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Table>
            <thead>
                <TableHeader>
                    <TableHead>Título</TableHead>
                    <TableHead>Curtidas</TableHead>
                </TableHeader>
            </thead>
            <tbody>
                {
                    articles.map(a => (
                        <>
                            <TableRow>
                                <TableData>{a.title}</TableData>
                                <TableData>{a.likes.length - 1}</TableData>
                            </TableRow>
                        </>
                    ))
                }
            </tbody>
        </Table>
    )
}
