import { prismaClient } from "../db";

const queries = {
  getAllEmployees: async (parent: any) => {
    const employee = await prismaClient.employee.findMany();
    console.log(employee, " user is coming ");
    return employee;
  },
};

const mutations = {
  createNewEmployee: async (
    parent: any,
    data: {employee: {
      email: string;
      name: string;
      linkedInProfile: string;
      profileImageUrl?: string;
      aadharNumber: number;
      password: string;
    }}
  ) => {
    
    const createEmployee = await prismaClient.employee.create({
      data: {
        email: data.employee.email,
        name: data.employee.name,
        LinkedInProfile: data.employee.linkedInProfile,
        ProfileImageUrl: data.employee.profileImageUrl,
        password: data.employee.password,
        aadharNumber: data.employee.aadharNumber,
      },
    });

    return createEmployee;
  },
};

export const resolvers = { queries, mutations };
