import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entity/movie.entity';
import { createMovieDto } from './dto/create-movie.dto';
import { updateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    getAll(): Movie[] {
        return this.moviesService.getAll();
    }

    @Get('/:id')
    getOne(@Param('id') movieId: number): Movie{
        return this.moviesService.getOne(movieId);
    }

    @Post()
    create(@Body() movieData: createMovieDto){
        return this.moviesService.create(movieData);
    }

    @Delete('/:id')
    remove(@Param('id') movieId: number){
        return this.moviesService.delete(movieId);
    }

    @Patch('/:id')
    patch(@Param('id') movieId: number, @Body() updateData: updateMovieDto){
        return this.moviesService.update(movieId, updateData);
    }

}
