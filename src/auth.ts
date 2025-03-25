//session helper file

import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

export const auth = () => getServerSession(authOptions);