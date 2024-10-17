import TestimonialsCarousel from "@/components/testimonials";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { features, howItWorks } from "@/utils/feature";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-24">
        <div className="lg:w-1/2">
          <h1 className="text-7xl font-extrabold pb-6 gradient-title">
            Your Meetings, 
            Your Time,      
            Simplified.
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            Whether it's private sessions or public meetings, we make every appointment a breeze.
          </p>

          <Link href='/dashboard'>
            <Button size="lg" className="text-lg">
              Get Started <ArrowRight className="ml-2 h-5 w-5"/>
            </Button>
          </Link>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md aspect-square">
            <Image src="/poster.png" alt="Schedule Calls" layout="fill" objectFit="contain"/> 
          </div>
        </div>
      </div>


      <div className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12 text-green-600"> 
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {features.map((feature, index)=>{
              return (
                <Card key={index}>
                  <CardHeader>
                    <feature.icon className="w-12 h-12 text-green-500 mb-4 mx-auto"/>
                    <CardTitle className="text-center text-green-600">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-gray-700">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
      </div>

      <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-green-600"> 
          What Our Users Has To Say!
        </h2>    
        <TestimonialsCarousel/>
      </div>

      <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-green-600"> 
          How It Works?
        </h2>    
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {howItWorks.map((step, index)=> (
            <div key={index} className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-xl">
                  {index+1}
                </span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{step.step}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-green-600 text-white rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Lets Connect In A Simplified Way!!
        </h2>
        <p className="text-xl mb-6">
          Join the community of professsionals who trust Calndr for Simplified
          and Efficient time management.
        </p>
        <Link href="/dashboard">
          <Button size='lg' variant="secondary" className="text-green-600">
            Start For Free <ArrowRight className="ml-2 h-5 w-5"/>
          </Button>
        </Link>
      </div>

    </main>
  );
}
