"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"

const Admin = () => {
  const [pets, setPets] = useState(null);
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Breed</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Vaccinated</TableHead>
            <TableHead>Neutered</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pets.map( (pet) => (
            <TableRow key={pet.id}>
              <TableCell className="font-medium">{pet.id}</TableCell>
              <TableCell>{pet.name}</TableCell>
              <TableCell>{pet.gender}</TableCell>
              <TableCell>{pet.breed}</TableCell>
              <TableCell>{pet.age}</TableCell>
              <TableCell>{pet.isVaccinated ? "Yes" : "No"}</TableCell>
              <TableCell>{pet.isNeutered ? "Yes" : "No"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="fixed bottom-8 right-8">Add Pet</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle>Pet Details</SheetTitle>
          <div className="mt-4">
            <Label>Name</Label>
            <Input placeholder="Name" className="mt-1" />
          </div>
          <div className="mt-4">
            <Label>Breed</Label>
            <Input placeholder="Breed" className="mt-1" />
          </div>
          <div className="mt-4">
            <Label>Age</Label>
            <Input type="number" placeholder="Age" className="mt-1" />
          </div>
          <div className="mt-4">
            <Label>Size</Label>
            <Input placeholder="Size" className="mt-1" />
          </div>
          <div className="mt-4">
            <Label>Gender</Label>
            <Input placeholder="Gender" className="mt-1" />
          </div>
          <div className="mt-4">
            <Label>Traits (Separate traits with commas)</Label>
            <Textarea />
          </div>
          <div className="mt-6 flex">
            <Checkbox className="mr-2" />
            <Label>Vaccinated</Label>
          </div>
          <div className="mt-6 flex">
            <Checkbox className="mr-2" />
            <Label>Neutered</Label>
          </div>
          <div className="mt-4">
            <Label>Photo</Label>
            <Input type="file" placeholder="Upload" className="mt-1" />
          </div>
          <div>
            <Button className="mt-16">Add Pet</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default Admin