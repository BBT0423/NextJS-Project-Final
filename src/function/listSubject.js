"use server";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const path = process.env.LocalhostDOTNET;

export const GetimportDetail = async (importHedderNumber) => {
  try {
    const importDetail = await axios.get(
      `${path}/api/List/GetDetailByHeaderNo/${importHedderNumber}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      }
    );
    if (!importDetail) {
      throw new Error("Cannot fetch data");
    }
    return importDetail.data;
  } catch (error) {
    throw new Error("Error to fetch data");
  }
};

export const GetiExcelDetail = async (importHedderNumber) => {
  try {
    const importDetail = await axios.get(
      `${path}/api/List/GetExcelDetailByHeaderNo/${importHedderNumber}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      }
    );
    
    if (!importDetail) {
      throw new Error("Cannot fetch data");
    }
    return importDetail.data;
  } catch (error) {
    throw new Error("Error to fetch data");
  }
};


export const getListSubjectByFilter = async (importHSearch) => {
  try {
    const allListSubject = await axios.get(
      `${path}/api/List/GetlistimportheaderByFilter`,
      {
        params: importHSearch,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      }
    );
    if (!allListSubject) {
      throw new Error("Cannot fetch data");
    }
    return allListSubject.data;
  } catch (error) {
    throw new Error("Error to fetch data");
  }
};

export const getAllListSubject = async (ImportHeaderNo,CourseID,page,userId) => {
  const queryParams = new URLSearchParams();
  if (ImportHeaderNo) queryParams.append('ImportHeaderNo', ImportHeaderNo);
  if (CourseID) queryParams.append('CourseID', CourseID);
  queryParams.append('page', page);

  const api = `${path}/api/List/Getlistimportheader?${queryParams.toString()}`;

  try {
    const allListSubject = await axios.get(api,
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
          "userId": userId.toString(),
        },
      }
    );
    if (!allListSubject) {
      throw new Error("Cannot fetch data");
    }
    return allListSubject.data;
  } catch (error) {
    throw new Error("Error to fetch data");
  }
};

export const getListimportheaderForPage = async (page,userId) => {
  const queryParams = new URLSearchParams();
  queryParams.append('page',page);
  const api = `${path}/api/List/GetlistimportheaderForPage?${queryParams.toString()}`;

  try {
    const allListSubject = await axios.get(api,{
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
          "userId": userId.toString(),
        },
      }
    );
    if (!allListSubject) {
      throw new Error("Cannot fetch data");
    }
    return allListSubject.data;
  } catch (error) {
    throw new Error("Error to fetch data");
  }
};

export const CountListSubject = async (ImportHeaderNo, CourseID,userId) => {
  const queryParams = new URLSearchParams();
  if (ImportHeaderNo) queryParams.append('ImportHeaderNo', ImportHeaderNo);
  if (CourseID) queryParams.append('CourseID', CourseID);

  const apiCount = `${path}/api/List/CountListimportheader?${queryParams.toString()}`;

  try {
    const countPage = await axios.get(apiCount, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        "userId": userId.toString(),
      },
    });

    if (!countPage) {
      throw new Error("Cannot fetch data");
    }

    return countPage.data;
  } catch (error) {
    throw new Error("Error fetching data");
  }
};

export const CountListimportheader = async (userId) => {
  const apiCount = `${path}/api/List/CountListimportheader`;
  
  try {
    const countPage = await axios.get(apiCount, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        "userId": userId.toString(),
      },
    });

    if (!countPage) {
      throw new Error("Cannot fetch data");
    }

    return countPage.data;
  } catch (error) {
    throw new Error("Error fetching data");
  }
};

export const deleteImportList = async (headerNumber) => {
  console.log("Function delete: " + headerNumber);
  try {
    const deleteIHeader = await axios.delete(
      `${path}/api/List/DeleteImportList?importHedderNumber=${headerNumber}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      }
    );
    if (deleteIHeader.status !== 200) {
      throw new Error("Cannot delete the importlist");
    }
    //return deleteIHeader.status;
  } catch (error) {
    throw new Error("Error to delete the importlist");
  }
  revalidatePath("/list/subjectlist");
  redirect("/list/subjectlist");
};
