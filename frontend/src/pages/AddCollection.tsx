import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../components/ui/card.tsx";
import {Label} from "../components/ui/label.tsx";
import {Input} from "../components/ui/input.tsx";
import {Button} from "../components/ui/button.tsx";
import {Textarea} from "../components/ui/textarea.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../components/ui/select.tsx";


export  function AddCollection() {
    console.log('bob')
    return (
        <div className="w-[100%] relative ">

        <Card className="w-full max-w-3xl mx-auto  left-[25%] z-10">
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
                            Collection Name
                        </Label>
                        <Input defaultValue="My Book Collection" id="name" />
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
                    <div className="grid gap-4">
                        <Label className="sm:col-span-2" htmlFor="image">
                            Image
                        </Label>
                        <Input id="image" type="file" />
                        <div>Upload an image to represent your collection. Max file size: 25MB</div>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button>Save Changes</Button>
            </CardFooter>
        </Card>
        </div>
    )
}

