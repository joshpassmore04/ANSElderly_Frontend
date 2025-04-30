import { useQuery } from "@tanstack/react-query";
import { makeBackendRequest } from "./Request";
import { useUser } from "./UserState";

export enum Role {
    DEFAULT = "default",
    MANAGER = "manager"
}

export enum RoleAction {
    CHECK = "check",
    SET = "set"
}

interface RoleResponse {
    result: boolean;
}

export const useRoleCheck = (role?: Role) => {
    const { user } = useUser();
    console.log("state: "+  user.loggedIn)

    return useQuery({
        queryKey: ["role", role],
        enabled: user.loggedIn && role !== undefined, // only run if logged in
        queryFn: async () => {
            try {
              const response = await makeBackendRequest<RoleResponse>("/user/role", {
                user_id: user.id,
                role: role,
                action: RoleAction.CHECK,
              });
              return response.result === true;
            } catch (error) {
              return false;
            }
          }
    });
};

