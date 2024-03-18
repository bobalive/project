import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "../components/ui/card"
import { Label } from "../components/ui/label"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "../components/ui/select"
import { Button } from "../components/ui/button"
import {useParams} from "react-router-dom";

export  function AddItems() {
    const {id} = useParams()
    console.log(id)
    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>My Book Collection</CardTitle>
                <CardDescription>
                    A collection of my favorite books, complete with author information and publication dates.
                </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <div className="grid gap-4 md:gap-8 p-4">
                    <div className="grid gap-4">
                        <Label className="sm:col-span-2" htmlFor="name">
                            Item Name
                        </Label>
                        <Input placeholder="name of something" id="name" />
                    </div>
                    <div className="grid gap-4">
                        <Label className="sm:col-span-2" htmlFor="name">
                            Item Tags
                        </Label>
                        <Input placeholder="#" id="tags" />
                    </div>
                    <div className="grid gap-4">
                        <Label className="sm:col-span-2" htmlFor="description">
                            Description
                        </Label>
                        <Textarea
                            className="min-h-[100px]"
                            id="description"
                            placeholder="Enter a description for your collection"
                        />
                    </div>
                    <div className="grid gap-4">
                        <Label className="sm:col-span-2" htmlFor="theme">
                            Theme
                        </Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a theme" />
                            </SelectTrigger>
                            <SelectContent className="w-full max-h-[200px]">
                                <SelectItem value="adventure">Adventure</SelectItem>
                                <SelectItem value="mystery">Mystery</SelectItem>
                                <SelectItem value="romance">Romance</SelectItem>
                                <SelectItem value="scifi">Science Fiction</SelectItem>
                                <SelectItem value="fantasy">Fantasy</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                </div>
            </CardContent>
            <CardFooter>
                <Button>Save Changes</Button>
            </CardFooter>
        </Card>
    )
}

