"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation"
import axios from 'axios';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

const List = () => {
  const router = useRouter();
  const [pets, setPets] = useState(null);
  const [breeds, setBreeds] = useState(null);
  const [sizes, setSizes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    axios.get('http://localhost:4000/api/v1/pets')
    .then( (res) => {
      setLoading(false);
      console.log("PETS: ", res.data.pets);
      setPets(res.data.pets);

      let breedList = [], sizeList = [];
      for (const pet of res.data.pets) {
        if (!breedList.includes(pet.breed)) breedList.push(pet.breed);
        if (!sizeList.includes(pet.size)) sizeList.push(pet.size);
      }

      setBreeds(breedList);
      setSizes(sizeList);
    })
    .catch( (error) => {
      console.error("ERROR: ", error.message);
    });
  }, []);

  if (loading) {
    return(
      <></>
    )
  }

  return (
    <div className="p-8 flex flex-row flex-wrap">
      { !!pets &&
        pets.map( (pet, index) => {
          return(
            <Card
              key={index}
              className="max-h-56 min-w-[22vw] ml-4 mb-4 drop-shadow-xl"
              onClick={ () => {
                console.log("PET ID: ", pet.id);
                // router.push({
                //   pathname: '/user/adopt',
                //   query: { petId: pet.id },
                // })
                router.push(`/user/${pet.id}`)
              }}
            >
              <CardHeader className="flex flex-row justify-between">
                <div>
                  <CardTitle>{pet.name}</CardTitle>
                  <CardDescription>{pet.breed}</CardDescription>
                </div>
                <div>
                  <Avatar>
                    <AvatarImage src={pet.photoUrl} />
                    <AvatarFallback>G</AvatarFallback>
                  </Avatar>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Age: {pet.age}</p>
                <p className="text-sm">Gender: {pet.gender}</p>
                <p className="text-sm">Size: {pet.size}</p>
              </CardContent>
              <CardFooter>
                { pet.isVaccinated && <Badge className="mr-1">Vaccinated</Badge> }
                { pet.isNeutered && <Badge className="mr-1">Neutered</Badge> }
                { pet.traits.length >= 1 &&
                  pet.traits.map( (trait, index) => {
                    return(
                      <Badge key={index} className="mr-1">{trait}</Badge>
                    )
                  })
                }
              </CardFooter>
            </Card>
          )
        })
      }
      <Sheet>
        <SheetTrigger asChild>
          <Button className="fixed bottom-8 right-8">Filter</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filter Pets</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            <Label>Age</Label>
            <div className="flex flex-row mt-2">
              <Input type="number" placeholder="Min" className="w-24 mr-4" />
              <Input type="number" placeholder="Min" className="w-24" />
            </div>
          </div>
          { !!breeds &&
            <div className="mt-4">
              <Label>Breed</Label>
              <div className="flex flex-row mt-2">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Breeds" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      breeds.map( (breed, index) => {
                        return(
                          <SelectItem value={breed} key={index}>{breed}</SelectItem>
                        )
                      })
                    }
                  </SelectContent>
                </Select>
              </div>
            </div>
          }
          { !!sizes &&
            <div className="mt-4">
              <Label>Size</Label>
              <div className="flex flex-row mt-2">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sizes" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      sizes.map( (size, index) => {
                        return(
                          <SelectItem value={size} key={index}>{size}</SelectItem>
                        )
                      })
                    }
                  </SelectContent>
                </Select>
              </div>
            </div>
          }
          <div className="mt-6 flex">
            <Checkbox className="mr-2" />
            <Label>Vaccinated</Label>
          </div>
          <div className="mt-6 flex">
            <Checkbox className="mr-2" />
            <Label>Neutered</Label>
          </div>
          <div className="mt-16">
            <Button>Save Filters</Button>
          </div>
          <Separator className="my-8" />
          <SheetTitle>Search Pets</SheetTitle>
          <div className="flex flex-row mt-4">
            <Input type="search" placeholder="Search for ..." className="mr-2" />
            <Button type="submit">Search</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default List