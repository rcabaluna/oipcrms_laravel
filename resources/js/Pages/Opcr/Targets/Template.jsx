import React from "react";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Template = () => {
    const rows = Array.from({ length: 20 }, (_, index) => (
        <TableRow key={index}>
            <TableCell>
                <Label>{index + 1}</Label>
            </TableCell>
            <TableCell>
                <Input type="text" className="text-xs py-1" />{" "}
                {/* Added class for small input */}
            </TableCell>
            <TableCell>
                <Input type="text" className="text-xs py-1" />{" "}
                {/* Added class for small input */}
            </TableCell>
            <TableCell>
                <Input type="text" className="text-xs py-1" />{" "}
                {/* Added class for small input */}
            </TableCell>
            <TableCell>
                <Textarea />
                {/* Added class for small input */}
            </TableCell>
        </TableRow>
    ));

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>No.</TableHead>
                        <TableHead>Indicators</TableHead>
                        <TableHead>Alignment of Indicators</TableHead>
                        <TableHead>Setting of Targets</TableHead>
                        <TableHead>Definition or Examples</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>{rows}</TableBody>
            </Table>
        </>
    );
};

export default Template;
