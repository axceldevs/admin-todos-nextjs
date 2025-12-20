import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) { 

    await prisma.todo.deleteMany({});

    await prisma.todo.createMany(
        {
            data: [
                {
                    description: "Piedra del alma",
                    completed: true
                },
                {
                    description: "Piedra del poder",
                    completed: true
                },
                {
                    description: "Piedra del tiempo",
                },
                {
                    description: "Piedra del espacio",
                },
                {
                    description: "Piedra del realidad",
                    completed: true
                }
            ]
        }
    )

    return NextResponse.json( {"message": "Seed Executed" } );
}