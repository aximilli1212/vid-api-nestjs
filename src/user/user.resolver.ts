import { Args, Context, Query, Resolver, Mutation } from '@nestjs/graphql'
import { BadRequestException, UseFilters, UseGuards } from '@nestjs/common';
import {UserService} from "./user.service";
import {AuthService} from "../auth/auth.service";
import {LoginResponse, RegisterResponse} from "../auth/types";
import {LoginDto, RegisterDto} from "../auth/dto";
import {User} from "./user.model";
import { Response, Request } from 'express';

@Resolver()
export class UserResolver {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    @Query(() => String)
    sayHello(): string {
        return 'Hi am the new bridge api for the frontend'
    }

    @Mutation(() => RegisterResponse)
    async register(
        @Args('registerInput') registerDto: RegisterDto,
        @Context() context: { res: Response },
    ): Promise<RegisterResponse> {

        if (registerDto.password !== registerDto.confirmPassword) {
            throw new BadRequestException({
                confirmPassword: 'Password and confirm password are not the same.',
            });
        }
        try {
            const { user } = await this.authService.register(
                registerDto,
                context.res,
            );
            console.log('user!', user);
            return { user };
        } catch (error) {
            // Handle the error, for instance if it's a validation error or some other type
            return {
                error: {
                    message: error.message,
                    // code: 'SOME_ERROR_CODE' // If you have error codes
                },
            };
        }
    }

    @Mutation(() => LoginResponse) // Adjust this return type as needed
    async login(
        @Args('loginInput') loginDto: LoginDto,
        @Context() context: { res: Response },
    ) {
        return this.authService.login(loginDto, context.res);
    }

    @Mutation(() => String)
    async logout(@Context() context: { res: Response }) {
        return this.authService.logout(context.res);
    }

    @Query(() => String)
    getProtectedData() {
        return 'This is protected data';
    }

    @Mutation(() => String)
    async refreshToken(@Context() context: { req: Request; res: Response }) {
        try {
            return this.authService.refreshToken(context.req, context.res);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Query(() => [User])
    async getUsers() {
        return this.userService.getUsers();
    }

    // @Mutation(() => User)
    // async updateUserProfile(
    //     @Context()
    //         context: { req: Request },
    //     @Args('fullname', { type: () => String, nullable: true }) fullname?: string,
    //     @Args('bio', { type: () => String, nullable: true }) bio?: string,
    //     @Args('image', { type: () => GraphQLUpload, nullable: true })
    //         image?: GraphQLUpload,
    // ) {
    //     console.log('image!', image, 'fullname!', fullname, 'bio!', bio);
    //     let imageUrl;
    //     if (image) {
    //         imageUrl = await this.storeImageAndGetURL(image);
    //     }
    //     return this.userService.updateProfile(context.req.user.sub, {
    //         fullname,
    //         bio,
    //         image: imageUrl,
    //     });
    // }



    // private async storeImageAndGetURL(file: GraphQLUpload): Promise<string> {
    //     const { createReadStream, filename } = await file;
    //     const fileData = await file;
    //     console.log('fileData!', fileData);
    //
    //     const uniqueFilename = `${uuidv4()}_${filename}`;
    //     const imagePath = join(process.cwd(), 'public', uniqueFilename);
    //     const imageUrl = `${process.env.APP_URL}/${uniqueFilename}`;
    //     const readStream = createReadStream();
    //     readStream.pipe(createWriteStream(imagePath));
    //
    //     return imageUrl; // Return the appropriate URL where the file can be accessed
    // }

}
