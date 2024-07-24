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
      isActive: true,
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

const update = async (
  id: string,
  data: {
    title?: string;
    template?: string;
    tags?: string[];
    description?: string;
  }
) => {
  await apiLinkedinTemplates.patch(`/crud?id=${id}`, { ...data });
};

export const contentToLinkedin = {
  create,
  remove,
  list,
  update,
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
