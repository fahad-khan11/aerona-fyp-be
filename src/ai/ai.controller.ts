import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('ai')
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('generate-itinerary')
  @ApiOperation({ summary: 'Generate a personalized AI itinerary based on user bookings (RAG)' })
  @ApiBody({ 
    schema: { 
      type: 'object', 
      properties: { 
        userId: { type: 'number', example: 1 } 
      } 
    } 
  })
  async generateItinerary(@Body('userId') userId: number) {
    return this.aiService.generateItinerary(userId);
  }
}
