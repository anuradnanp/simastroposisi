/* Copyright (C) 2022 Alma Nuradnan Pramudita (email: gocodealpha@gmail.com)

This file is part of SimAstroPosisi.

SimAstroPosisi is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

SimAstroPosisi is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with SimAstroPosisi. If not, see <https://www.gnu.org/licenses/>. */

function magnetlicense() {
	var x = document.getElementById("magnet-license").getAttribute("aria-expanded");
	var y = document.getElementById("magnet-license-button");
	var z = document.getElementById("magnet-license");
	if (x == "true") {
		y.innerHTML = "buka lisensi template Magnet";
	} else {
		y.innerHTML = "tutup lisensi template Magnet";
		z.innerHTML = "<p>Magnet Portfolio Template</p><p>Author</p><p>This freebie resource is kindly provided by Khai Tawng. Don&apos;t forget to check out his Creative Market Shop for more premium goods of the highest quality.</p><p>Contact us – info@pixelbuddha.net</p><p>License</p><p>This free resource is provided by PixelBuddha team. It is royalty free for use in personal and commercial projects with a couple of restrictions. This freebie is an intellectual property of the author.</p><p>Rights</p><p>You may modify the resource according to your requirements and implement in projects like websites, applications, templates or other materials in your personal, non-profitable or commercial projects that are not intended to be sold on markets, stocks, etc. If you are going to use our freebies in commercial projects that are for sale or multiple replications, you will need an extended license. The extended license is provided by the author of the particular freebie — either it is PixelBuddha team or a guest author (in this case the credits are always included in the package). It is not necessary to link back to PixelBuddha.net, but we would appreciate if you do credit our resources.</p><p>Publications</p><p>You are welcome to republish our freebies on condition that you link back to PixelBuddha.net, and you should not provide the assets for direct download from your website.</p><p>Prohibitions</p><p>You do not have rights to redistribute, resell, lease, license, sub-license or offer this resource to any third party «as is». If you want to use this resource as a part of a product intended to be sold via any marketplace, please contact the author of the freebie to get an extended license.</p><p>Contact us – info@pixelbuddha.net<br>(C) PixelBuddha 2016</p>";
	}
}