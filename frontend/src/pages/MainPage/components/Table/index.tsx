import { useContext } from "react";
import { Table, TableHeader, TableRow, TableHead, TableData } from "./styles";
import { ArticleContext } from "../../../../context/article";

export default function List() {

    const { article } = useContext(ArticleContext);

    console.log(article);

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
                    article.map(a => (
                        <>
                            <TableRow>
                                <TableData>{a.title}</TableData>
                                <TableData>{a.likes.length}</TableData>
                            </TableRow>
                        </>
                    ))
                }
            </tbody>
        </Table>
    )
}
