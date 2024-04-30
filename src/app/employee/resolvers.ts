import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { prismaClient } from "../db";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: '',
  credentials: {
    secretAccessKey: "",
    accessKeyId: "",
  },
});
const queries = {
  getAllEmployees: async (parent: any) => {
    const employee = await prismaClient.employee.findMany();
    console.log(employee, " user is coming ");
    return employee;
  },

  getSignedURLForTweet: async (
    parent: any,
    { imageType, imageName }: { imageType: string; imageName: string }
  ) => {
    const allowedImageTypes = [
      "image/jpg",
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedImageTypes.includes(imageType))
      throw new Error("Unsupported Image Type");

    const putObjectCommand = new PutObjectCommand({
      Bucket: "",
      ContentType: imageType,
      Key: `uploads/${Math.floor(
        Math.random() * 1000
      )}/tweets/${imageName}-${Date.now()}`,
    });

    const signedURL = await getSignedUrl(s3Client, putObjectCommand);
    return signedURL;
  },
};

const mutations = {
  createNewEmployee: async (
    parent: any,
    data: {
      employee: {
        email: string;
        name: string;
        linkedInProfile: string;
        profileImageUrl?: string;
        aadharNumber: number;
        password: string;
      };
    }
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
