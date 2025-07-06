import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countryFlag',
  standalone: true // optional if using standalone components
})
export class CountryFlagPipe implements PipeTransform {
  private countryMap: { [key: string]: string } = {
    india: 'IN',
    usa: 'US',
    unitedstates: 'US',
    canada: 'CA',
    france: 'FR',
    germany: 'DE',
    japan: 'JP',
    australia: 'AU',
    uk: 'GB',
    england: 'GB',
    china: 'CN',
    brazil: 'BR',
  };

  transform(countryName: string): string {
    if (!countryName) return '';

    const code = this.countryMap[countryName.toLowerCase().trim()];
    if (!code) return '';

    return String.fromCodePoint(
      ...code.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0))
    );
  }
}
