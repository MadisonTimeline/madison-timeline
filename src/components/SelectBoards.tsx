import React from "react";
import { useState, useEffect } from "react";
import { Board } from "@/types/Board";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function SelectBoards({
    boardnames,
    setBoardnames,

}: {
    boardnames: string[];
    setBoardnames: (boardnames: string[]) => void;
}) {
    const [boards, setBoards] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBoards = async () => {
            const response = await fetch("/api/getAllBoards");
            if (response.ok) {
                const data = await response.json();
                // remove description from boards
                const boardNames = data.map((board: Board) => board.name);
                setBoards(boardNames);
                setLoading(false);
            }
        };
        fetchBoards();
    }, []);



    return (
        <DropdownMenu>
            <DropdownMenuTrigger>Open</DropdownMenuTrigger>
            <DropdownMenuContent className="overflow-auto xl:max-h-[150px] md:max-h-[100px]">
                {boards.map((board) => (
                    <DropdownMenuLabel key={board} >
                        <Checkbox 
                            checked={boardnames.includes(board)}
                            onCheckedChange={(checked) => {
                                if (checked) {
                                    setBoardnames([...boardnames, board]);
                                } else {
                                    setBoardnames(boardnames.filter((boardname) => boardname !== board));
                                }
                            }
                        }
                        />
                        <Label > {board} </Label>
                    </DropdownMenuLabel>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}