import { Unauthorized } from "../../errors/Unauthorized";
import { UserService } from "../../user/service";
import { AddressService } from "../service";

describe('AddressService - Tests', () => {
    const userService = new UserService();
    const addressService = new AddressService();
    
    beforeAll(async () => {
        await userService.createUser({
            name: "John",
            lastName: "Roffman",
            email: "john@example.com",
            password: "test",
            username: "johnroffman",
        })

        await userService.createUser({
            name: "Maria",
            lastName: "Santos",
            email: "maria@example.com",
            password: "test",
            username: "mariasantos",
        })

        await addressService.storeAddress(1, {
            title: "title",
            addressLine: "addressLine",
            number: "number",
            complement: "complement",
        })

        await addressService.storeAddress(2, {
            title: "title",
            addressLine: "addressLine",
            number: "number",
            complement: "complement",
        })
    })

    it('should return an address', async () => {
        const address = await addressService.getAddressById(1, 1);
        expect(address).toBeInstanceOf(Object)
        expect(address.id).toBe(1)
    })

    it('should update an address', async () => {
        const address = await addressService.updateAddress(1, 1, {
            title: "title updated",
            addressLine: "addressLine",
            number: "number",
            complement: "complement",
        });
        expect(address).toBeInstanceOf(Object)
        expect(address.id).toBe(1)
    })

    it('should delete an address', async () => {
        const address = await addressService.deleteAddress(1, 1);
        expect(address).toBeInstanceOf(Object)
        expect(address.id).toBe(1)
    })

    it('should not return an address', async () => {
        try {
            const address = await addressService.getAddressById(1, 2);
        } catch (error) {
            expect(error).toBeInstanceOf(Unauthorized)
        }
    })
})
