import { getAllService } from "../services/user.service";
import * as UserRepo from "../repository/user.repo";
import { User } from "../entities/user.entity";

const mockGetAll = jest.fn();
jest.mock("../repository/user.repo", () => ({
  getAll: mockGetAll,
}));

describe("getAllService Test Suite", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return users when users exist", async () => {
    const mockUsers: User[] = [
      {
        id: "1",
        name: "John Doe",
        email: "john.doe@mail.com",
        createdAt: new Date("2023-09-01T12:00:00Z"),
        updatedAt: new Date("2023-09-01T12:00:00Z"),
        profile: {
          id: "1",
          gender: "Male",
          bio: "John's bio",
        },
      },
    ];

    mockGetAll.mockResolvedValue(mockUsers);

    const result = await getAllService();

    expect(result).toEqual(mockUsers);
    expect(UserRepo.getAll).toHaveBeenCalled();
  });
});
