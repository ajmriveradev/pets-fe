"use client"
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useParams } from "next/navigation";
import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const PetProfile = () => {
  const { toast } = useToast()
  const { petId } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/v1/pets/${petId}`)
    .then( (res) => {
      console.log("PET: ", res.data.pet);
      setPet(res.data.pet);
    })
    .catch( (error) => {
      console.error("ERROR: ", error.message);
    });
  }, []);

  if (!pet) {
    return <></>
  }

  return (
    <div className="p-8 flex flex-row">
      <div className="mr-8">
        <Image
          src={pet.photoUrl}
          width={400}
          height={400}
          alt={pet.name}
        />
      </div>
      <div>
        <p className="font-bold text-2xl">{pet.name}</p>
        <p className="font-regular text-lg">Breed: {pet.breed}</p>
        <p className="font-regular text-lg">Age: {pet.age} {pet.age > 1 ? `years old` : `year old`}</p>
        <p className="font-regular text-lg">Gender: {pet.gender}</p>
        <p className="font-regular text-lg">Size: {pet.size}</p>
        <div className="flex flex-row mt-2">
          { pet.isVaccinated && <Badge className="mr-1">Vaccinated</Badge> }
          { pet.isNeutered && <Badge className="mr-1">Neutered</Badge> }
        </div>
        <div className="flex flex-row mt-2">
          { pet.traits.length >= 1 &&
            pet.traits.map( (trait, index) => {
              return(
                <Badge key={index} className="mr-1 bg-green-300" variant="outline" >{trait}</Badge>
              )
            })
          }
        </div>
        <div className="flex flex-row mt-16">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-emerald-900">Adopt {pet.name}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Fur Parent Details</DialogTitle>
                <DialogDescription>
                  Please enter the necessary details below to process {pet.name}'s adoption.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Juan Dela Cruz"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="address" className="text-right">
                    Address
                  </Label>
                  <Input
                    id="address"
                    placeholder="1040 Alyx St. Sydney"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    placeholder="0000000000000"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    onClick={() => {
                      toast({
                        title: "Adoption is In Progress!",
                        description: `${pet.name} is excited!`,
                      })
                    }}
                    type="submit"
                  >
                    Process Adoption
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default PetProfile