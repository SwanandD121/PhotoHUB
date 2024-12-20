"use client"
import { State, UpdateUserSettings } from '@/app/actions'
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { toast } from 'sonner'
import { SubmitButton } from '../SubmitButton'

interface iAppProps {
    firstName: string;
    lastName: string;
    email: string;
}

const SettingsForm = ({email, firstName, lastName}: iAppProps) => {
    const initialState: State = {message: "", status: undefined}
    const [state, formAction] = useFormState(UpdateUserSettings, initialState);

    useEffect(() => {    
      if(state?.status === "success"){
        toast.success(state.message);
    } else if(state?.status === "error"){
        toast.error(state.message);
      }
    }, [state])
    
    
  return (
    <div>
        <form action={formAction}>
            <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Settings regarding your account.</CardDescription>
            </CardHeader>

            <CardContent className='flex flex-col gap-y-5'>
                <div className="flex flex-col gap-y-2">
                    <Label>First Name</Label>
                    <Input name='firstName' type='text' defaultValue={firstName}/>
                </div>
                <div className="flex flex-col gap-y-2">
                    <Label>Last Name</Label>
                    <Input name='lastName' type='text' defaultValue={lastName}/>
                </div>
                <div className="flex flex-col gap-y-2">
                    <Label>Email</Label>
                    <Input name='email' type='email' disabled  defaultValue={email}/>
                </div>

            </CardContent>
            <CardFooter>
                <SubmitButton title='Update Details'/>
            </CardFooter>
        </form>
    </div>
  )
}

export default SettingsForm