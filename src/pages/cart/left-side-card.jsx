import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import React from 'react'

function LeftSideCard({totalPrice}) {
  return (
    <div className="border-[1px] h-auto p-4 flex flex-col gap-2 rounded-lg">
          <p className="text-lg md:text-xl font-bold">Calculated Shipping</p>
          <div className="flex flex-col gap-4 mt-4">
            <div className="grid gap-3">
              <Label htmlFor="text" className="text-blue-600">
                Country
              </Label>
              <Input
                id="country"
                type="text"
                placeholder="eg: India"
                required
              />
            </div>
            <div className="flex gap-2">
              <div className="grid gap-3">
                <Label htmlFor="text" className="text-blue-600">
                  State
                </Label>
                <Input
                  id="state"
                  type="text"
                  placeholder="eg: West Bengal"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="text" className="text-blue-600">
                  ZIP Code
                </Label>
                <Input id="zip" type="text" placeholder="eg: 741235" required />
              </div>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Calculate Shipping
            </Button>
          </div>
          <Separator />
          <p className="text-lg md:text-xl font-bold">Coupon Code</p>

          <div>
            <div className="grid gap-3">
              <Label htmlFor="text" className="text-blue-600">
                Apply Ccde
              </Label>
              <Input id="code" type="text" placeholder="eg: sd45rt" required />
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-4">
              Apply Coupon
            </Button>
          </div>
          <div className="bg-blue-600 h-auto p-4 rounded-md">
            <p className="text-lg md:text-xl font-bold text-white">
              Cart Total
            </p>
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <p className="text-white">total price:</p>
                <p className="text-white">{totalPrice}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-white">delivary fee:</p>
                <p className="text-white">122</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-white">discount amount:</p>
                <p className="text-white">0</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-white text-lg font-semibold">
                  Final Amount:
                </p>
                <p className="text-white text-lg font-semibold">{totalPrice}</p>
              </div>
            </div>
            <Button className="w-full bg-white text-blue-600 hover:bg-gray-100 mt-4">
              Proceed to Checkout
            </Button>
          </div>
        </div>
  )
}

export default LeftSideCard