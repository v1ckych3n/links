// This allows us to process/render the descriptions, which are in Markdown!
// More about Markdown: https://en.wikipedia.org/wiki/Markdown
let markdownIt = document.createElement('script')
markdownIt.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js'
document.head.appendChild(markdownIt)



// Okay, Are.na stuff!
let channelSlug = 'dystopia-szw6q7kh94s' // The “slug” is just the end of the URL



// First, let’s lay out some *functions*, starting with our basic metadata:
let placeChannelInfo = (data) => {
	// Target some elements in your HTML:
	let channelTitle = document.getElementById('channel-title')
	let channelDescription = document.getElementById('channel-description')
	let channelCount = document.getElementById('channel-count')
	let channelLink = document.getElementById('channel-link')

	// Then set their content/attributes to our data:
	channelTitle.innerHTML = data.title
	channelDescription.innerHTML = window.markdownit().render(data.metadata.description) // Converts Markdown → HTML
	channelCount.innerHTML = data.length
	channelLink.href = `https://www.are.na/channel/${channelSlug}`
}



// Then our big function for specific-block-type rendering:
let renderBlock = (block) => {
	// To start, a shared `ul` where we’ll insert all our blocks
	console.log(block)
	let channelBlocks = document.getElementById('channel-blocks')

	// Links!
	if (block.class == 'Link') {

		/* for some reason, if the link JavaScript function is deleted then more images will show??? */
		let linkItem =
			`
				<li class="block">
					<p><em>Link</em></p>
					<figure>
						<img src="${ block.image.large.url }">
					</figure>
					<button class="click-button_open">&#11297;</button>
					<section class="arena-popup">
						<p><a href="${block.source.url}">${block.generated_title} &#10228;</a></p>
						<div>
							<img src="${block.image.large.url}">
						</div>
						<div>
							<p>connected at ${block.connected_at}</p>
							<p>created at ${block.created_at}</p>
							<p>media connected by ${block.connected_by_username}</p>
						</div>
						<button class="click-button_close">EXIT</button>
					</section> 
				</li>
			`
		channelBlocks.insertAdjacentHTML('beforeend', linkItem)
	}

	// Images!
	else if (block.class == 'Image') {
		// …up to you!
		let imageItem = 
			`
				<li class="block">
					<figure>
						<img src="${block.image.large.url}">
					</figure>
					<button class="click-button_open">&#11297;</button>
					<section class="arena-popup">
						<p>${block.generated_title}</p>
						<div>
							<img src="${block.image.large.url}">
						</div>
						<div>
							<p>connected at ${block.connected_at}</p>
							<p>created at ${block.created_at}</p>
							<p>media connected by ${block.connected_by_username}</p>
						</div>
						<button class="click-button_close">EXIT</button>
					</section> 
				</li>
			`
		channelBlocks.insertAdjacentHTML('beforeend',imageItem)
	}

	// Text!
	else if (block.class == 'Text') {
		
		// …up to you!
		let textItem =
		/* can't seem to pull in my text block */
			`
				<li class="block block--text">
					<blockquote>
						${block.content_html}
					</blockquote>
					<button class="click-button_open">&#11297;</button>
					<section class="arena-popup">
						<p>${block.generated_title}</p>
						<div>
							${block.content_html}
						</div>
						<div>
							<p>connected at ${block.connected_at}</p>
							<p>created at ${block.created_at}</p>
							<p>media connected by ${block.connected_by_username}</p>
						</div>
						<button class="click-button_close">EXIT</button>
					</section> 
				</li>
			`
		channelBlocks.insertAdjacentHTML('beforeend',textItem)
	}

	// Uploaded (not linked) media…
	else if (block.class == 'Attachment') {
		let attachment = block.attachment.content_type // Save us some repetition

		// Uploaded videos!
		if (attachment.includes('video')) {
			// …still up to you, but we’ll give you the `video` element:
	
			let videoItem =
				`
					<li class="block">
						<figure>
							<img src="${block.image.large.url}">
						</figure>
						<button class="click-button_open">&#11297;</button>
						<section class="arena-popup">
							<p><a href="${block.source.url}">${block.generated_title} &#10228;</a></p>
							<div>
								${ block.embed.html }
							</div>
							<div>
								<p>connected at ${block.connected_at}</p>
								<p>created at ${block.created_at}</p>
								<p>media connected by ${block.connected_by_username}</p>
							</div>
							<button class="click-button_close">EXIT</button>
						</section>
					</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend', videoItem)

			// More on video, like the `autoplay` attribute:
			// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
		}

		// Uploaded PDFs!
		else if (attachment.includes('pdf')) {
			// …up to you!
			
			let pdfItem = 
				`
					<li class="block">
						<figure>
							<img src=${block.image.large.url}></img>
						</figure>
						<button class="click-button_open">&#11297;</button>
						<section class="arena-popup">
							<p><a href="${block.attachment.url}">${block.generated_title} &#10228;</a></p>
							<div>
								<img src="${block.image.large.url}">
							</div>
							<div>
								<p>connected at ${block.connected_at}</p>
								<p>created at ${block.created_at}</p>
								<p>media connected by ${block.connected_by_username}</p>
							</div>
							<button class="click-button_close">EXIT</button>
						</section>
					</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend', pdfItem)
		}

		// Uploaded audio!
		else if (attachment.includes('audio')) {
			// …still up to you, but here’s an `audio` element:
			let audioItem =
				`
					<li class="block">
						<audio controls src="${ block.attachment.url }"></video>
						<button class="click-button_open">&#11297;</button>
					</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend', audioItem)
			// More on audio: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
		}
	}

	// Linked media…
	else if (block.class == 'Media') {
		let embed = block.embed.type
		// Linked video!
		if (embed.includes('video')) {
			// …still up to you, but here’s an example `iframe` element:
			
			let linkedVideoItem =
				`
					<li class="block">
						<figure>
							<img src="${block.image.large.url}">
						</figure>
						<button class="click-button_open">&#11297;</button>
						<section class="arena-popup">
							<p><a href="${block.source.url}">${block.generated_title} &#10228;</a></p>
							<div>
								${block.embed.html}
							</div>
							<div>
								<p>connected at ${block.connected_at}</p>
								<p>created at ${block.created_at}</p>
								<p>media connected by ${block.connected_by_username}</p>
							</div>
							<button class="click-button_close">EXIT</button>
						</section>
					</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend',linkedVideoItem)
			// More on iframe: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
		}

		// Linked audio!
		else if (embed.includes('rich')) {
			// …up to you!
			let richItem =
				`
					<li class="block">
						<figure>
							<img src="${block.image.large.url}">
						</figure>
						<button class="click-button_open">&#11297;</button>
						<section class="arena-popup">
							<p><a href="${block.source.url}">${block.generated_title} &#10228;</a></p>
							<div>
								<a href="${ block.source.url }">${block.embed.html}</a>
							</div>
							<div>
								<p>connected at ${block.connected_at}</p>
								<p>created at ${block.created_at}</p>
								<p>media connected by ${block.connected_by_username}</p>
							</div>
							<button class="click-button_close">EXIT</button>
						</section>
					</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend', richItem)
		}
	}
}



// It‘s always good to credit your work:
let renderUser = (user, container) => { // You can have multiple arguments for a function!
	let userAddress =
		`
		<address>
			<img src="${ user.avatar_image.display }">
			<h3>${ user.first_name }</h3>
			<p><a href="https://are.na/${ user.slug }">Are.na profile ↗</a></p>
		</address>
		`
	container.insertAdjacentHTML('beforeend', userAddress)
}



// Now that we have said what we can do, go get the data:
fetch(`https://api.are.na/v2/channels/${channelSlug}?per=100`, { cache: 'no-store' })
	.then((response) => response.json()) // Return it as JSON data
	.then((data) => { // Do stuff with the data
		// console.log(data) // Always good to check your response!
		placeChannelInfo(data) // Pass the data to the first function

		// Loop through the `contents` array (list), backwards. Are.na returns them in reverse!
		data.contents.reverse().forEach((block) => {
			// console.log(block) // The data for a single block
			renderBlock(block) // Pass the single block data to the render function
		})

		// BUTTON FUNCTION   BUTTON FUNCTIONS   BUTTON FUNCTIONS

		//landing page fixed banner buttons
		document.getElementById("closeMyHeader").addEventListener("click", function() {
			let header = document.getElementById("myHeader");
			header.parentNode.removeChild(header);
		});

		// sidebar return "home" button (doesn't work yet????)
		// document.getElementById("openMyHeader").addEventListener("click", function() {
		// 	let header = document.getElementById("myHeader");
		// 	header.classList.toggle("myHeader");
		// });

		// Arena Pop-up buttons
		let openPopups = document.querySelectorAll('.click-button_open')

		openPopups.forEach((openPopup) => {
			openPopup.onclick = () => { // attach the event
				let parentBlock = openPopup.parentElement
				parentBlock.classList.toggle('active') // toggle the class
			}
		})

		let closePopups = document.querySelectorAll('.click-button_close')

		closePopups.forEach((closePopup) => {
			closePopup.onclick = () => { // attach the event
				let parentBlock = closePopup.closest('.block')
				parentBlock.classList.toggle('active') // toggle the class
			}
		})
		
	})
