import { apiLinkedinTemplates } from "@/server/config/axios";

const create = async (
  owner: string,
  title: string,
  template: string,
  tags: string[],
  description?: string
) => {
  const { data } = await apiLinkedinTemplates.post<{ data: string }>(
    `/crud`,
    {
      title,
      template,
      tags,
      description,
      entity: "TEMPLATES",
    },
    {
      headers: {
        user: owner,
      },
    }
  );

  const id = data.data;

  return id;
};

const list = async (user: string) => {
  const { data } = await apiLinkedinTemplates.get(`/crud`, {
    headers: {
      user,
      action: "LIST",
    },
  });

  return {
    templates: data.data.response,
    count: data.data.count,
  };
};

const remove = async (id: string) => {
  await apiLinkedinTemplates.delete(`/crud?id=${id}`);
};

export const contentToLinkedin = {
  create,
  remove,
  list,
};

interface ILinkedinTemplate {
  id?: string;
  owner: string;
  title: string;
  template: string;
  tags: string[];
  description: string;
}

const templates: ILinkedinTemplate[] = [
  {
    description: "",
    title: "Bold Claim",
    tags: [],
    template: "",
    owner: "",
  },
];
