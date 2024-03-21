import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import githubLogo from "../assets/github-mark.svg"

export function SimpleFooter() {
    const { setTheme } = useTheme()
    return (
        <footer className='flex justify-center items-center p-5 absolute bottom-0 w-full'>
            <Button className="mr-5"onClick={() => window.location = "https://github.com/Toni-d-e-v/BlockGrade"} variant="secondary">
                <img src={githubLogo} alt="Github Logo" width="30" className='mr-2' />
                Github
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon">
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                        Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                        Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                        System
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <p className="ml-10 text-foreground"> BlockGrade - E-diplome - Projekt za sum.ba Code Challenge 2024 </p>
        </footer>
    );
}