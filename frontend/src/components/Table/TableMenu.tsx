import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../ui/table.tsx";

export const TableMenu = ()=>{
    return (
        <div className="border shadow-sm rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[150px]">Collection</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="w-[150px]">Theme</TableHead>
                        <TableHead className="w-[150px]">Items</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <a className="font-semibold" href="#">
                                My Books
                            </a>
                        </TableCell>
                        <TableCell className="text-sm">A collection of my favorite books</TableCell>
                        <TableCell>Books</TableCell>
                        <TableCell>25</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <a className="font-semibold" href="#">
                                Travel Memories
                            </a>
                        </TableCell>
                        <TableCell className="text-sm">Capturing the essence of my adventures</TableCell>
                        <TableCell>Travel</TableCell>
                        <TableCell>50</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <a className="font-semibold" href="#">
                                Culinary Creations
                            </a>
                        </TableCell>
                        <TableCell className="text-sm">Exploring the art of gastronomy</TableCell>
                        <TableCell>Food</TableCell>
                        <TableCell>10</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <a className="font-semibold" href="#">
                                Artistic Inspirations
                            </a>
                        </TableCell>
                        <TableCell className="text-sm">Embracing the beauty of creativity</TableCell>
                        <TableCell>Art</TableCell>
                        <TableCell>30</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}