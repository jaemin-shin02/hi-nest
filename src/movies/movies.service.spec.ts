import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { Movie } from './entity/movie.entity';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  it('should be 4', () =>{
    expect(2+2).toEqual(4);
  });

  describe('getAll()', () =>{
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne()', () =>{
    it('should return a movie', () => {
      service.create(
        {
          title: "Dragon",
          genres: ["Anymation"],
          year: 2019,
        }
      );
      const result = service.getOne(1);
      expect(result).toBeDefined();
      expect(result.id).toEqual(1);
    });
    it('should throw 404 Error', ()=>{
      try{
        service.getOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  });

  describe('deleteOne()', () =>{
    it('should return a 0', () => {
      service.create(
        {
          title: "Dragon",
          genres: ["Anymation"],
          year: 2019,
        }
      );
      service.delete(1);
      const result = service.getAll();
      expect(result.length).toEqual(0);
    });
    it('should throw 404 Error', ()=>{
      try{
        service.delete(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  });

  describe('create()', () =>{
    it('should return a 0', () => {
      const beforeCreate = service.getAll().length;
      service.create(
        {
          title: "Dragon",
          genres: ["Anymation"],
          year: 2019,
        }
      );
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
      const movie = service.getOne(1);
      expect(movie.title).toEqual("Dragon");
      expect(movie.year).toEqual(2019);
    });
  });

  describe('update', () => {
    it('should update a movie', () =>{
      service.create(
        {
          title: "Dragon",
          genres: ["Anymation"],
          year: 2019,
        }
      );
      service.update(1, { title: "SUL" });
      const movie = service.getOne(1);
      expect(movie.title).toEqual("SUL");
    });
    it('should throw 404 Error', ()=>{
      try{
        service.update(999, {title:"go"});
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

});
