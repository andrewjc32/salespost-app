"use server";

import { prisma } from "@/lib/prisma";

export async function getStatusList() {
  try {
    const status = prisma.company_status.findMany();

    return status;
  } catch (error) {
    // do something
  }
}

export async function getCityList() {
  try {
    const cities = prisma.cities.findMany();

    return cities;
  } catch (error) {
    // do something
  }
}