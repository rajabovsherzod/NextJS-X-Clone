"use client";
import useRegisterModal from '@/hooks/useRegisterModal';
import Modal from '../ui/modal';
import useCreateAccountStep from '@/hooks/createAccountStep';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userPersonalInfoSchema, verifyCodeSchema, createPasswordSchema } from '@/lib/validation';
import * as z from 'zod';
import Image from 'next/image';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from 'lucide-react';

const months = [
    { value: "1", label: "January" }, { value: "2", label: "February" }, { value: "3", label: "March" },
    { value: "4", label: "April" }, { value: "5", label: "May" }, { value: "6", label: "June" },
    { value: "7", label: "July" }, { value: "8", label: "August" }, { value: "9", label: "September" },
    { value: "10", label: "October" }, { value: "11", label: "November" }, { value: "12", label: "December" },
];

// 1-QADAM UCHUN FORMALAR (prop'lar orqali boshqariladi)
const GetUserPersonalInfoForm = ({ form, onSubmit }: { form: ReturnType<typeof useForm<z.infer<typeof userPersonalInfoSchema>>>, onSubmit: (values: z.infer<typeof userPersonalInfoSchema>) => void }) => {
    const nameValue = form.watch("name");
    const monthValue = form.watch("birthMonth");
    const yearValue = form.watch("birthYear");
    const dayValue = form.watch("birthDay");

    const daysInMonth = (() => {
        if (!monthValue || !yearValue) return 31;
        return new Date(parseInt(yearValue, 10), parseInt(monthValue, 10), 0).getDate();
    })();

    useEffect(() => {
        if (dayValue && parseInt(dayValue, 10) > daysInMonth) {
            form.setValue("birthDay", "", { shouldValidate: true });
        }
    }, [monthValue, yearValue, dayValue, daysInMonth, form]);

    return (
        <Form {...form}>
            <form id="step1-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <div className="relative">
                                <Input {...field} id="name" className="block h-16 rounded-md px-3 pb-2 pt-6 w-full text-lg bg-transparent border-neutral-700 border-2 appearance-none focus:outline-none focus:ring-0 focus:border-sky-500 peer" placeholder=" " />
                                <FormLabel htmlFor="name" className="absolute text-md text-neutral-500 duration-150 transform -translate-y-3 scale-75 top-5 z-10 origin-[0] left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-sky-500">Name</FormLabel>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500">{nameValue.length} / 50</div>
                            </div>
                        </FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <div className="relative">
                                <Input {...field} id="email" type="email" className="block h-16 rounded-md px-3 pb-2 pt-6 w-full text-lg bg-transparent border-neutral-700 border-2 appearance-none focus:outline-none focus:ring-0 focus:border-sky-500 peer" placeholder=" " />
                                <FormLabel htmlFor="email" className="absolute text-md text-neutral-500 duration-150 transform -translate-y-3 scale-75 top-5 z-10 origin-[0] left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-sky-500">Email</FormLabel>
                            </div>
                        </FormControl>
                    </FormItem>
                )} />
                <div className="pt-4">
                    <h3 className="font-bold">Date of birth</h3>
                    <p className="text-sm text-neutral-500 mt-1">This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</p>
                </div>
                <div className="grid grid-cols-10 gap-3">
                    <FormField control={form.control} name="birthMonth" render={({ field }) => (
                        <FormItem className="col-span-4"><FormLabel>Month</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger className="h-14"><SelectValue placeholder="Month" /></SelectTrigger></FormControl><SelectContent>{months.map((month) => (<SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>))}</SelectContent></Select></FormItem>
                    )} />
                    <FormField control={form.control} name="birthDay" render={({ field }) => (
                        <FormItem className="col-span-3"><FormLabel>Day</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger className="h-14"><SelectValue placeholder="Day" /></SelectTrigger></FormControl><SelectContent>{[...Array(daysInMonth)].map((_, i) => (<SelectItem key={i + 1} value={`${i + 1}`}>{i + 1}</SelectItem>))}</SelectContent></Select></FormItem>
                    )} />
                    <FormField control={form.control} name="birthYear" render={({ field }) => (
                        <FormItem className="col-span-3"><FormLabel>Year</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger className="h-14"><SelectValue placeholder="Year" /></SelectTrigger></FormControl><SelectContent>{[...Array(100)].map((_, i) => (<SelectItem key={i} value={`${new Date().getFullYear() - i}`}>{new Date().getFullYear() - i}</SelectItem>))}</SelectContent></Select></FormItem>
                    )} />
                </div>
            </form>
        </Form>
    );
};

// 2-QADAM UCHUN FORMALAR
const VerifyEmailForm = ({ form, onSubmit }: { form: ReturnType<typeof useForm<z.infer<typeof verifyCodeSchema>>>, onSubmit: (values: z.infer<typeof verifyCodeSchema>) => void }) => {
    return (
        <Form {...form}>
            <form id="step2-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                 <div className="text-left">
                      <h1 className="text-3xl font-extrabold">We sent you a code</h1>
                      <p className="text-neutral-500 text-sm mt-2">Enter it below to verify your email.</p>
                 </div>
                 <FormField control={form.control} name="code" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Verification code</FormLabel>
                        <FormControl className="mt-2">
                            <InputOTP maxLength={6} {...field}>
                                <InputOTPGroup className="flex w-full gap-2">
                                    {[...Array(6)].map((_, index) => (
                                        <InputOTPSlot key={index} index={index} className="flex-1 h-16 rounded-md border border-neutral-700 text-2xl" />
                                    ))}
                                </InputOTPGroup>
                            </InputOTP>
                        </FormControl>
                    </FormItem>
                 )} />
                 <a href="#" className="mt-4 inline-block text-sm text-sky-500 hover:underline">Didn't receive email?</a>
            </form>
        </Form>
    );
};

const CreatePasswordForm = ({ form, onSubmit }: { form: ReturnType<typeof useForm<z.infer<typeof createPasswordSchema>>>, onSubmit: (values: z.infer<typeof createPasswordSchema>) => void }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <div className="mb-8 text-left">
                <h1 className="text-3xl font-extrabold">You'll need a password</h1>
                <p className="text-neutral-500 text-sm mt-2">Make sure it's 8 characters or more.</p>
            </div>
            <Form {...form}>
                <form id="step3-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField control={form.control} name="password" render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        {...field}
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        className="block h-16 rounded-md px-3 pb-2 pt-6 w-full text-lg bg-transparent border-neutral-700 border-2 appearance-none focus:outline-none focus:ring-0 focus:border-sky-500 peer"
                                        placeholder=" "
                                    />
                                    <FormLabel
                                        htmlFor="password"
                                        className="absolute text-md text-neutral-500 duration-150 transform -translate-y-3 scale-75 top-5 z-10 origin-[0] left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-sky-500"
                                    >
                                        Password
                                    </FormLabel>
                                    <div
                                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </div>
                                </div>
                            </FormControl>
                            <FormMessage className="text-red-500 text-xs pt-1"/>
                        </FormItem>
                    )} />
                </form>
            </Form>
        </>
    );
}

// ASOSIY MODAL KOMPONENTI (Boshqaruv markazi)
const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const { step, setStep } = useCreateAccountStep();

    const step1Form = useForm<z.infer<typeof userPersonalInfoSchema>>({
        resolver: zodResolver(userPersonalInfoSchema),
        defaultValues: { name: "", email: "", birthMonth: "", birthDay: "", birthYear: "" }
    });

    const step2Form = useForm<z.infer<typeof verifyCodeSchema>>({
        resolver: zodResolver(verifyCodeSchema),
        defaultValues: { code: "" }
    });

    const step3Form = useForm<z.infer<typeof createPasswordSchema>>({
        resolver: zodResolver(createPasswordSchema),
        defaultValues: { password: "" }
    });

    const onStep1Submit = (values: z.infer<typeof userPersonalInfoSchema>) => {
        console.log("Step 1 data:", values);
        setStep(2);
    };
    
    const onStep2Submit = (values: z.infer<typeof verifyCodeSchema>) => {
        console.log("Step 2 data:", values);
        setStep(3);
    };

    const onStep3Submit = (values: z.infer<typeof createPasswordSchema>) => {
        console.log("Step 3 data:", values);
        registerModal.onClose();
    };

    const bodyContent = (
        <div className="flex flex-col h-[600px] max-h-[85vh] p-4">
            <div className="flex w-full items-center justify-center relative mb-4">
                 <Image src="/images/x.svg" alt="Logo" width={30} height={30}/>
            </div>
            
            <div className="flex-grow flex flex-col px-4 overflow-y-auto overflow-x-hidden">
                {step === 1 && (
                    <>
                        <div className="mb-8 text-center">
                            <h1 className="text-3xl font-extrabold">Create your account</h1>
                        </div>
                        <GetUserPersonalInfoForm form={step1Form} onSubmit={onStep1Submit} />
                    </>
                )}
                
                {step === 2 && <VerifyEmailForm form={step2Form} onSubmit={onStep2Submit} />}

                {step === 3 && <CreatePasswordForm form={step3Form} onSubmit={onStep3Submit} />}
            </div>

            <div className="mt-auto pt-6">
                <Button 
                    type="submit" 
                    form={step === 1 ? "step1-form" : step === 2 ? "step2-form" : "step3-form"} 
                    className="w-full rounded-full bg-neutral-200 text-black font-bold py-3 text-md hover:bg-neutral-300"
                >
                    {step === 3 ? "Sign up" : "Next"}
                </Button>
            </div>
        </div>
    );

    return (
        <Modal
            body={bodyContent}
            isOpen={registerModal.isOpen}
            onClose={registerModal.onClose}
        />
    );
};

export default RegisterModal;