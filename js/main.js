
/* Apply values from config.js. Edit config.js instead of searching the whole project. */
(() => {
  const config = window.RAYCO_CONFIG || {};

  const createElement=(tag,className,text)=>{
    const element=document.createElement(tag);
    if(className)element.className=className;
    if(text!==undefined)element.textContent=text;
    return element;
  };

  const createStars=(rating,className)=>{
    const value=Math.max(1,Math.min(5,Number(rating)||5));
    const stars=createElement('span',className);
    stars.setAttribute('aria-label',`${value} ดาวจาก 5 ดาว`);
    for(let index=0;index<5;index++){
      const star=createElement('i','review-star',index<value?'★':'☆');
      star.style.setProperty('--star-index',String(index));
      star.setAttribute('aria-hidden','true');
      stars.append(star);
    }
    return stars;
  };

  const brand=config.brand||{};
  document.querySelectorAll('[data-brand-logo]').forEach(image=>{
    if(brand.logo)image.src=brand.logo;
    if(brand.logoAlt)image.alt=brand.logoAlt;
  });
  const promiseImage=document.querySelector('[data-promise-image]');
  if(promiseImage&&config.brandPromiseImage)promiseImage.src=config.brandPromiseImage;

  const productGrid=document.getElementById('eyeglasses');
  if(productGrid&&Array.isArray(config.products)){
    const cards=config.products.map((product,index)=>{
      const images=Array.isArray(product.images)?product.images.filter(Boolean):product.image?[product.image]:[];
      const card=createElement('article',`collection-card reveal${product.bestSeller?' is-best-seller':''}`);
      card.dataset.category=product.category||'optical';
      card.dataset.productIndex=String(index);
      card.dataset.productName=product.name||'';
      card.dataset.keywords=[product.code,product.name,product.description,product.collection,product.badge,product.keywords].filter(Boolean).join(' ');
      card.style.setProperty('--product-delay',`${(index%4)*85}ms`);

      const media=createElement('button','product-media');
      media.type='button';
      media.dataset.productOpen=String(index);
      media.setAttribute('aria-label',`ดูภาพ ${product.name||'สินค้านี้'} แบบขยาย`);
      media.append(createElement('span','product-badge',product.badge||'CURATED'));
      if(product.bestSeller){
        const bestSeller=createElement('span','product-best-seller');
        bestSeller.append(createElement('b','','BEST SELLER'),createElement('small','','สินค้าขายดี'));
        media.append(bestSeller);
      }
      if(images[0]){
        const image=createElement('img');
        image.src=images[0];
        image.alt=`${product.name||'กรอบแว่น'} — ${product.code||''}`.trim();
        image.loading=index<3?'eager':'lazy';
        image.addEventListener('error',()=>{
          image.remove();
          media.classList.add('is-placeholder');
          media.append(createElement('span','product-placeholder','ADD PRODUCT PHOTO'));
        });
        media.append(image);
      }else{
        media.classList.add('is-placeholder');
        media.append(createElement('span','product-placeholder','ADD PRODUCT PHOTO'));
      }
      const zoomHint=createElement('span','product-zoom-hint','ขยายภาพ');
      zoomHint.setAttribute('aria-hidden','true');
      media.append(zoomHint);

      const meta=createElement('div','product-meta');
      meta.append(createElement('small','product-collection',product.collection||product.code||'CURATED FRAME'));
      meta.append(createElement('h3','',product.name||'Untitled Frame'));
      meta.append(createElement('p','product-description',product.description||''));
      if(product.price){
        const price=createElement('p','product-price');
        price.append(createElement('span','product-price-label','ราคา'));
        price.append(createElement('strong','',product.price));
        if(product.oldPrice)price.append(createElement('del','',product.oldPrice));
        meta.append(price);
      }
      const lineLink=createElement('a','product-inquiry','สอบถามสินค้า');
      lineLink.href=config.lineUrl||'#contact';
      lineLink.target='_blank';
      lineLink.rel='noopener';
      lineLink.setAttribute('aria-label',`สอบถาม ${product.name||'สินค้านี้'} ทาง LINE`);
      lineLink.append(createElement('span','','→'));
      meta.append(lineLink);
      card.append(media,meta);
      return card;
    });
    productGrid.replaceChildren(...cards);
  }

  const brandGrid=document.getElementById('brandGrid');
  if(brandGrid&&Array.isArray(config.brands)){
    const brands=config.brands.filter(Boolean).map((brand,index)=>{
      const cell=createElement('span','brand-cell');
      cell.style.setProperty('--brand-delay',`${(index%6)*65}ms`);
      cell.append(createElement('b','',brand));
      return cell;
    });
    brandGrid.replaceChildren(...brands);
  }

  const reviewsTrack=document.getElementById('reviewsTrack');
  if(reviewsTrack&&Array.isArray(config.reviews)){
    const reviews=config.reviews.filter(review=>review&&review.text);
    const cards=reviews.map((review,index)=>{
      const rating=Math.max(1,Math.min(5,Number(review.rating)||5));
      const card=createElement('article','review-card reveal');
      card.dataset.reviewIndex=String(index);
      card.style.setProperty('--review-delay',`${(index%3)*90}ms`);
      card.style.setProperty('--review-cycle-delay',`${(index*0.72).toFixed(2)}s`);
      const top=createElement('div','review-card-top');
      const quote=createElement('span','review-quote','“');
      const stars=createStars(rating,'review-card-stars');
      top.append(quote,stars);
      const text=createElement('blockquote','',review.text);
      const person=createElement('footer','review-person');
      const avatar=createElement('span','review-avatar',review.initials||String(review.name||'R').trim().slice(0,1));
      avatar.setAttribute('aria-hidden','true');
      const identity=createElement('div','');
      identity.append(createElement('strong','',review.name||'ลูกค้า Ray & Co'),createElement('small','',review.service||'ลูกค้า Ray & Co'));
      person.append(avatar,identity);
      card.append(top,text,person);
      return card;
    });
    reviewsTrack.replaceChildren(...cards);
    const average=document.getElementById('reviewAverage');
    const count=document.getElementById('reviewCount');
    const total=document.getElementById('reviewTotal');
    const sample=document.getElementById('reviewSampleLabel');
    if(average)average.textContent=String(config.reviewSummary?.average||'5.0');
    if(count)count.textContent=String(cards.length);
    if(total)total.textContent=String(cards.length).padStart(2,'0');
    if(sample)sample.hidden=config.reviewSummary?.isSample===false;
    const summaryStars=document.querySelector('.review-summary .review-stars');
    if(summaryStars){
      const animated=createStars(5,'review-stars');
      summaryStars.replaceWith(animated);
    }
  }

  const showroomTrack=document.getElementById('showroomTrack');
  if(showroomTrack&&Array.isArray(config.gallery)){
    const galleryCards=config.gallery.map((item,index)=>{
      const card=createElement('article',`showroom-card reveal${item.image?'':' is-placeholder'}`);
      card.dataset.galleryIndex=String(index);
      const media=createElement(item.image?'button':'div','showroom-media');
      if(item.image){
        media.type='button';
        media.setAttribute('aria-label',`ขยายภาพ ${item.title||index+1}`);
        media.dataset.galleryOpen=String(index);
        const image=createElement('img');
        image.src=item.image;
        image.alt=item.alt||item.title||`บรรยากาศร้านภาพที่ ${index+1}`;
        image.loading='lazy';
        media.append(image);
      }else{
        media.setAttribute('aria-hidden','true');
        media.append(createElement('span','','R&Co'),createElement('small','','ADD SHOWROOM PHOTO'));
      }
      const caption=createElement('div','showroom-caption');
      caption.append(createElement('span','',String(index+1).padStart(2,'0')),createElement('h3','',item.title||`บรรยากาศร้าน ${index+1}`));
      card.append(media,caption);
      return card;
    });
    showroomTrack.replaceChildren(...galleryCards);
    const total=document.getElementById('galleryTotal');
    if(total)total.textContent=String(galleryCards.length).padStart(2,'0');
  }

  const tiktokSection=document.getElementById('tiktok');
  const tiktokGrid=document.getElementById('tiktokGrid');
  if(tiktokSection&&tiktokGrid&&Array.isArray(config.tiktokVideos)){
    const getTikTokVideo=(entry,index)=>{
      const item=typeof entry==='string'?{url:entry}:entry||{};
      const url=String(item.url||'').trim();
      let parsed;
      try{parsed=new URL(url)}catch{return null}
      const trustedHost=parsed.hostname==='tiktok.com'||parsed.hostname.endsWith('.tiktok.com');
      const match=parsed.pathname.match(/\/video\/(\d{10,})/);
      if(!trustedHost||!match)return null;
      return {id:match[1],url,title:item.title||`TikTok วิดีโอที่ ${index+1}`};
    };
    const videos=config.tiktokVideos.map(getTikTokVideo).filter(Boolean);
    if(videos.length){
      const cards=videos.map((video,index)=>{
        const card=createElement('article','tiktok-card reveal');
        card.style.setProperty('--tiktok-delay',`${Math.min(index,3)*90}ms`);
        const frame=createElement('iframe','tiktok-frame');
        frame.src=`https://www.tiktok.com/player/v1/${encodeURIComponent(video.id)}?autoplay=0&loop=0`;
        frame.title=video.title;
        frame.loading='lazy';
        frame.allow='fullscreen; autoplay; encrypted-media; picture-in-picture';
        frame.referrerPolicy='strict-origin-when-cross-origin';
        frame.setAttribute('allowfullscreen','');
        const footer=createElement('div','tiktok-card-footer');
        footer.append(createElement('span','',String(index+1).padStart(2,'0')));
        const link=createElement('a','',video.title);
        link.href=video.url;
        link.target='_blank';
        link.rel='noopener';
        link.setAttribute('aria-label',`${video.title} — เปิดบน TikTok`);
        footer.append(link);
        card.append(frame,footer);
        return card;
      });
      tiktokGrid.replaceChildren(...cards);
      tiktokSection.hidden=false;
      document.querySelectorAll('[data-tiktok-nav]').forEach(link=>{link.hidden=false});
      const profileLink=document.getElementById('tiktokProfileLink');
      if(profileLink&&config.tiktokProfileUrl){
        profileLink.href=config.tiktokProfileUrl;
        profileLink.hidden=false;
      }
    }
  }

  if (config.lineUrl) {
    document.querySelectorAll('a[href*="line.me"]').forEach(link => {
      link.href = config.lineUrl;
    });
  }
  document.querySelectorAll('[data-config]').forEach(element => {
    const keys = element.dataset.config.split('.');
    const value = keys.reduce((result, key) => result?.[key], config);
    if (value !== undefined && value !== null && value !== '') element.textContent = value;
  });
  const contact = config.contact || {};
  const hasRealValue = value => typeof value === 'string' && value.trim() && !value.trim().startsWith('ใส่');
  document.querySelectorAll('[data-phone-link]').forEach(link => {
    if (!hasRealValue(contact.phone)) return;
    const phoneDigits = contact.phone.replace(/[^+\d]/g, '');
    if (phoneDigits.replace(/\D/g, '').length >= 9) link.href = `tel:${phoneDigits}`;
    else link.removeAttribute('href');
  });
  const footerAddress = document.querySelector('[data-footer-address]');
  if (footerAddress && hasRealValue(contact.address)) {
    footerAddress.textContent = contact.address;
    footerAddress.hidden = false;
  }
  const footerPhone = document.querySelector('[data-footer-phone]');
  if (footerPhone && hasRealValue(contact.phone)) {
    footerPhone.textContent = contact.phone;
    const phoneDigits = contact.phone.replace(/[^+\d]/g, '');
    if (phoneDigits.replace(/\D/g, '').length >= 9) footerPhone.href = `tel:${phoneDigits}`;
    else footerPhone.removeAttribute('href');
    footerPhone.hidden = false;
  }
  const footerTikTok = document.querySelector('[data-footer-tiktok]');
  if (footerTikTok && config.tiktokProfileUrl) footerTikTok.href = config.tiktokProfileUrl;
  const socialLinks = {
    facebook: config.socialLinks?.facebook || '',
    instagram: config.socialLinks?.instagram || '',
    tiktok: config.socialLinks?.tiktok || config.tiktokProfileUrl || '',
    line: config.socialLinks?.line || config.lineUrl || ''
  };
  document.querySelectorAll('[data-social]').forEach(link => {
    const url = socialLinks[link.dataset.social];
    if (url) {
      link.href = url;
      link.hidden = false;
    } else {
      link.hidden = true;
    }
  });
  const mapFrame = document.querySelector('[data-map-frame]');
  const mapPlaceholder = document.querySelector('[data-map-placeholder]');
  const mapEmbedUrl = hasRealValue(contact.mapEmbedUrl)
    ? contact.mapEmbedUrl
    : hasRealValue(contact.address) && !contact.isSample
      ? `https://www.google.com/maps?q=${encodeURIComponent(contact.address)}&output=embed`
      : '';
  if (mapFrame && mapEmbedUrl) {
    mapFrame.src = mapEmbedUrl;
    mapFrame.hidden = false;
    if (mapPlaceholder) mapPlaceholder.hidden = true;
  }
  const mapOpenUrl = hasRealValue(contact.mapOpenUrl)
    ? contact.mapOpenUrl
    : hasRealValue(contact.address) && !contact.isSample
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`
      : '';
  document.querySelectorAll('[data-map-link]').forEach(link => {
    if (mapOpenUrl) link.href = mapOpenUrl;
  });
})();

const button=document.querySelector('.menu-btn'),menu=document.querySelector('.mobile-nav');
    button.addEventListener('click',()=>{const open=menu.classList.toggle('open');button.setAttribute('aria-expanded',open);button.textContent=open?'×':'☰'});
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');button.setAttribute('aria-expanded','false');button.textContent='☰'}));
    const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');observer.unobserve(e.target)}}),{threshold:.12});
    document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

(()=>{
      const hero=document.querySelector('.hero');
      const slides=[...document.querySelectorAll('.hero-slide')];
      const dots=[...document.querySelectorAll('[data-hero-slide]')];
      const currentLabel=document.getElementById('heroCurrent');
      const totalLabel=document.getElementById('heroTotal');
      if(slides.length<2)return;
      const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const duration=Number(window.RAYCO_CONFIG?.hero?.autoplayMilliseconds)||5500;
      let current=0,timer;
      const format=value=>String(value).padStart(2,'0');
      if(totalLabel)totalLabel.textContent=format(slides.length);
      const show=index=>{
        current=(index+slides.length)%slides.length;
        slides.forEach((slide,i)=>slide.classList.toggle('is-active',i===current));
        dots.forEach((dot,i)=>{
          const active=i===current;
          dot.classList.toggle('is-active',active);
          if(active)dot.setAttribute('aria-current','true');
          else dot.removeAttribute('aria-current');
        });
        if(currentLabel)currentLabel.textContent=format(current+1);
      };
      const stop=()=>{if(timer){clearTimeout(timer);timer=undefined}};
      const start=()=>{if(reduceMotion||timer)return;timer=setTimeout(()=>{timer=undefined;show(current+1);start()},duration)};
      const step=direction=>{stop();show(current+direction);start()};
      dots.forEach((dot,index)=>dot.addEventListener('click',()=>{stop();show(index);start()}));
      hero.addEventListener('keydown',event=>{
        if(!['ArrowLeft','ArrowRight'].includes(event.key))return;
        event.preventDefault();
        step(event.key==='ArrowRight'?1:-1);
      });
      if(!reduceMotion&&window.matchMedia('(pointer:fine)').matches){
        hero.addEventListener('pointermove',event=>{
          const rect=hero.getBoundingClientRect();
          const x=(event.clientX-rect.left)/rect.width-.5;
          const y=(event.clientY-rect.top)/rect.height-.5;
          hero.style.setProperty('--hero-shift-x',`${x*-10}px`);
          hero.style.setProperty('--hero-shift-y',`${y*-7}px`);
        });
        hero.addEventListener('pointerleave',()=>{
          hero.style.setProperty('--hero-shift-x','0px');
          hero.style.setProperty('--hero-shift-y','0px');
        });
      }
      hero.addEventListener('pointerenter',stop);
      hero.addEventListener('pointerleave',start);
      hero.addEventListener('focusin',stop);
      hero.addEventListener('focusout',start);
      document.addEventListener('visibilitychange',()=>document.hidden?stop():start());
      show(0);
      start();
    })();

(()=>{
      const dialog=document.getElementById('productLightbox');
      const image=document.getElementById('productLightboxImage');
      const canvas=document.getElementById('productZoomCanvas');
      const title=document.getElementById('productLightboxTitle');
      const collection=document.getElementById('productLightboxCollection');
      const description=document.getElementById('productLightboxDescription');
      const price=document.getElementById('productLightboxPrice');
      const currentPrice=document.getElementById('productLightboxCurrentPrice');
      const oldPrice=document.getElementById('productLightboxOldPrice');
      const thumbs=document.getElementById('productLightboxThumbs');
      const angleGallery=document.getElementById('productAngleGallery');
      const imagePrevious=document.querySelector('[data-image-prev]');
      const imageNext=document.querySelector('[data-image-next]');
      const imageCounter=document.getElementById('productImageCounter');
      const imageCurrent=document.getElementById('productImageCurrent');
      const imageTotal=document.getElementById('productImageTotal');
      const lineLink=document.getElementById('productLightboxLine');
      const zoomValue=document.getElementById('productZoomValue');
      const products=Array.isArray(window.RAYCO_CONFIG?.products)?window.RAYCO_CONFIG.products:[];
      if(!dialog||!image||!canvas||!products.length)return;

      let productIndex=0,imageIndex=0,scale=1,offsetX=0,offsetY=0;
      let dragging=false,swiping=false,startX=0,startY=0,originX=0,originY=0;
      const clamp=(value,min,max)=>Math.min(max,Math.max(min,value));
      const productImages=product=>Array.isArray(product?.images)?product.images.filter(Boolean):product?.image?[product.image]:[];
      const applyTransform=()=>{
        if(scale===1){offsetX=0;offsetY=0}
        image.style.transform=`translate3d(${offsetX}px,${offsetY}px,0) scale(${scale})`;
        canvas.classList.toggle('is-zoomed',scale>1);
        if(zoomValue)zoomValue.value=`${Math.round(scale*100)}%`;
      };
      const setScale=next=>{scale=clamp(next,1,3.5);applyTransform()};
      const resetZoom=()=>{scale=1;offsetX=0;offsetY=0;applyTransform()};
      const showImage=index=>{
        const product=products[productIndex];
        const images=productImages(product);
        if(!images.length)return;
        imageIndex=(index+images.length)%images.length;
        image.src=images[imageIndex];
        image.alt=`${product.name||'สินค้า'} ภาพที่ ${imageIndex+1}`;
        image.classList.remove('is-changing');
        void image.offsetWidth;
        image.classList.add('is-changing');
        if(imageCurrent)imageCurrent.textContent=String(imageIndex+1).padStart(2,'0');
        if(imageTotal)imageTotal.textContent=String(images.length).padStart(2,'0');
        const hasMultiple=images.length>1;
        if(imagePrevious)imagePrevious.hidden=!hasMultiple;
        if(imageNext)imageNext.hidden=!hasMultiple;
        if(imageCounter)imageCounter.hidden=!hasMultiple;
        resetZoom();
        thumbs?.querySelectorAll('button').forEach((button,i)=>{
          const active=i===imageIndex;
          button.classList.toggle('is-active',active);
          button.setAttribute('aria-current',active?'true':'false');
        });
      };
      const showProduct=index=>{
        productIndex=(index+products.length)%products.length;
        const product=products[productIndex];
        const images=productImages(product);
        if(title)title.textContent=product.name||'Untitled Frame';
        if(collection)collection.textContent=[product.collection,product.code].filter(Boolean).join(' · ');
        if(description)description.textContent=product.description||'';
        if(price&&currentPrice){
          const hasPrice=Boolean(product.price);
          price.hidden=!hasPrice;
          currentPrice.textContent=product.price||'';
          if(oldPrice){
            oldPrice.textContent=product.oldPrice||'';
            oldPrice.hidden=!product.oldPrice;
          }
        }
        if(lineLink){
          const base=window.RAYCO_CONFIG?.lineUrl||lineLink.href;
          lineLink.href=base;
          lineLink.setAttribute('aria-label',`สอบถาม ${product.name||'สินค้านี้'} ทาง LINE`);
        }
        if(thumbs){
          const buttons=images.map((src,i)=>{
            const button=document.createElement('button');
            button.type='button';
            button.setAttribute('aria-label',`ดูภาพที่ ${i+1}`);
            const thumb=document.createElement('img');
            thumb.src=src;
            thumb.alt='';
            button.append(thumb);
            button.addEventListener('click',()=>showImage(i));
            return button;
          });
          thumbs.replaceChildren(...buttons);
          thumbs.hidden=buttons.length<2;
          if(angleGallery)angleGallery.hidden=buttons.length<2;
        }
        if(images.length)showImage(0);
      };
      const open=index=>{
        if(!productImages(products[index]).length)return;
        showProduct(index);
        dialog.showModal();
      };
      document.querySelectorAll('[data-product-open]').forEach(button=>button.addEventListener('click',()=>open(Number(button.dataset.productOpen))));
      document.querySelector('[data-product-close]')?.addEventListener('click',()=>dialog.close());
      document.querySelector('[data-product-prev]')?.addEventListener('click',()=>showProduct(productIndex-1));
      document.querySelector('[data-product-next]')?.addEventListener('click',()=>showProduct(productIndex+1));
      imagePrevious?.addEventListener('click',()=>showImage(imageIndex-1));
      imageNext?.addEventListener('click',()=>showImage(imageIndex+1));
      document.querySelector('[data-zoom-in]')?.addEventListener('click',()=>setScale(scale+.35));
      document.querySelector('[data-zoom-out]')?.addEventListener('click',()=>setScale(scale-.35));
      document.querySelector('[data-zoom-reset]')?.addEventListener('click',resetZoom);
      canvas.addEventListener('wheel',event=>{
        event.preventDefault();
        setScale(scale+(event.deltaY<0?.22:-.22));
      },{passive:false});
      canvas.addEventListener('dblclick',()=>setScale(scale===1?2.2:1));
      image.addEventListener('animationend',()=>image.classList.remove('is-changing'));
      canvas.addEventListener('pointerdown',event=>{
        startX=event.clientX;startY=event.clientY;
        if(scale<=1)swiping=true;
        else{dragging=true;originX=offsetX;originY=offsetY}
        canvas.setPointerCapture(event.pointerId);
      });
      canvas.addEventListener('pointermove',event=>{
        if(!dragging)return;
        offsetX=originX+(event.clientX-startX);
        offsetY=originY+(event.clientY-startY);
        applyTransform();
      });
      const stopPointer=event=>{
        if(swiping&&event){
          const deltaX=event.clientX-startX;
          const deltaY=event.clientY-startY;
          if(Math.abs(deltaX)>55&&Math.abs(deltaX)>Math.abs(deltaY)*1.2)showImage(imageIndex+(deltaX<0?1:-1));
        }
        dragging=false;swiping=false;
      };
      canvas.addEventListener('pointerup',stopPointer);
      canvas.addEventListener('pointercancel',()=>stopPointer());
      dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
      dialog.addEventListener('close',()=>{resetZoom();image.removeAttribute('src')});
      dialog.addEventListener('keydown',event=>{
        if(event.key==='ArrowLeft'){
          event.preventDefault();
          if(event.shiftKey)showProduct(productIndex-1);else showImage(imageIndex-1);
        }
        if(event.key==='ArrowRight'){
          event.preventDefault();
          if(event.shiftKey)showProduct(productIndex+1);else showImage(imageIndex+1);
        }
        if(event.key==='+'||event.key==='=')setScale(scale+.35);
        if(event.key==='-')setScale(scale-.35);
        if(event.key==='0')resetZoom();
      });
    })();

const createInfiniteCarousel=({viewport,track,cardSelector,previous,next,currentLabel})=>{
      const originals=[...track.querySelectorAll(`:scope > ${cardSelector}`)];
      if(!viewport||!track||!originals.length)return null;

      const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const format=value=>String(value).padStart(2,'0');
      originals.forEach((card,index)=>card.dataset.carouselIndex=String(index));

      if(originals.length===1){
        originals[0].classList.add('is-current');
        if(currentLabel)currentLabel.textContent='01';
        return {originals,cards:originals};
      }

      const cloneCard=card=>{
        const clone=card.cloneNode(true);
        clone.classList.add('is-carousel-clone','in');
        clone.classList.remove('is-current');
        clone.setAttribute('aria-hidden','true');
        clone.querySelectorAll('a,button,input,select,textarea,[tabindex]').forEach(control=>control.tabIndex=-1);
        return clone;
      };
      track.prepend(...originals.map(cloneCard));
      track.append(...originals.map(cloneCard));

      const cards=[...track.querySelectorAll(`:scope > ${cardSelector}`)];
      const originalCount=originals.length;
      let physicalIndex=originalCount;
      let scrollFrame=0;
      let settleTimer=0;

      const trackPadding=()=>parseFloat(getComputedStyle(track).paddingLeft)||0;
      const targetLeft=card=>card.offsetLeft-trackPadding();
      const logicalIndex=index=>Number(cards[index]?.dataset.carouselIndex||0);
      const nearestIndex=()=>{
        const viewportStart=viewport.scrollLeft+trackPadding();
        let closest=0;
        let distance=Infinity;
        cards.forEach((card,index)=>{
          const nextDistance=Math.abs(card.offsetLeft-viewportStart);
          if(nextDistance<distance){distance=nextDistance;closest=index}
        });
        return closest;
      };
      const update=index=>{
        physicalIndex=index;
        cards.forEach((card,cardIndex)=>card.classList.toggle('is-current',cardIndex===index));
        if(currentLabel)currentLabel.textContent=format(logicalIndex(index)+1);
      };
      const jumpTo=index=>{
        const previousBehavior=viewport.style.scrollBehavior;
        viewport.style.scrollBehavior='auto';
        viewport.scrollLeft=targetLeft(cards[index]);
        update(index);
        requestAnimationFrame(()=>{viewport.style.scrollBehavior=previousBehavior});
      };
      const normalize=()=>{
        const nearest=nearestIndex();
        let normalized=nearest;
        if(nearest<originalCount)normalized=nearest+originalCount;
        else if(nearest>=originalCount*2)normalized=nearest-originalCount;
        if(normalized!==nearest)jumpTo(normalized);else update(nearest);
      };
      const scheduleNormalize=delay=>{
        clearTimeout(settleTimer);
        settleTimer=window.setTimeout(normalize,delay);
      };
      const goTo=index=>{
        const bounded=Math.max(0,Math.min(cards.length-1,index));
        update(bounded);
        viewport.scrollTo({left:targetLeft(cards[bounded]),behavior:reduceMotion?'auto':'smooth'});
        scheduleNormalize(reduceMotion?40:720);
      };
      const step=direction=>{
        const nearest=nearestIndex();
        goTo(nearest+direction);
      };

      previous?.addEventListener('click',()=>step(-1));
      next?.addEventListener('click',()=>step(1));
      viewport.addEventListener('keydown',event=>{
        if(!['ArrowLeft','ArrowRight'].includes(event.key))return;
        event.preventDefault();
        step(event.key==='ArrowRight'?1:-1);
      });
      viewport.addEventListener('scroll',()=>{
        cancelAnimationFrame(scrollFrame);
        scrollFrame=requestAnimationFrame(()=>update(nearestIndex()));
        scheduleNormalize(180);
      },{passive:true});
      window.addEventListener('resize',()=>scheduleNormalize(120),{passive:true});
      requestAnimationFrame(()=>requestAnimationFrame(()=>jumpTo(originalCount)));

      return {originals,cards,normalize};
    };

(()=>{
      const viewport=document.getElementById('showroomViewport');
      const track=document.getElementById('showroomTrack');
      if(!viewport||!track)return;
      const carousel=createInfiniteCarousel({
        viewport,
        track,
        cardSelector:'.showroom-card',
        previous:document.querySelector('[data-gallery-prev]'),
        next:document.querySelector('[data-gallery-next]'),
        currentLabel:document.getElementById('galleryCurrent')
      });
      if(!carousel)return;

      const lightbox=document.getElementById('galleryLightbox');
      const lightboxImage=document.getElementById('galleryLightboxImage');
      const lightboxCaption=document.getElementById('galleryLightboxCaption');
      const closeButton=document.querySelector('[data-gallery-close]');
      document.querySelectorAll('[data-gallery-open]').forEach(button=>button.addEventListener('click',()=>{
        const item=window.RAYCO_CONFIG?.gallery?.[Number(button.dataset.galleryOpen)];
        if(!item?.image||!lightbox||!lightboxImage)return;
        lightboxImage.src=item.image;
        lightboxImage.alt=item.alt||item.title||'ภาพบรรยากาศร้าน';
        if(lightboxCaption)lightboxCaption.textContent=item.title||'';
        lightbox.showModal();
      }));
      const close=()=>lightbox?.open&&lightbox.close();
      closeButton?.addEventListener('click',close);
      lightbox?.addEventListener('click',event=>{if(event.target===lightbox)close()});
      lightbox?.addEventListener('close',()=>{if(lightboxImage)lightboxImage.removeAttribute('src')});
    })();

(()=>{
      const viewport=document.getElementById('reviewsViewport');
      const track=document.getElementById('reviewsTrack');
      if(!viewport||!track)return;
      createInfiniteCarousel({
        viewport,
        track,
        cardSelector:'.review-card',
        previous:document.querySelector('[data-review-prev]'),
        next:document.querySelector('[data-review-next]'),
        currentLabel:document.getElementById('reviewCurrent')
      });
    })();

(()=>{
      'use strict';

      const header=document.getElementById('siteHeader');
      const setHeaderState=()=>header.classList.toggle('scrolled',window.scrollY>36);
      addEventListener('scroll',setHeaderState,{passive:true});
      setHeaderState();

      document.querySelectorAll('a[href*="line.me"]').forEach(link=>{
        if(link.target==='_blank')link.rel='noopener';
      });
      const year=document.getElementById('currentYear');
      if(year)year.textContent=new Date().getFullYear();

      const cards=[...document.querySelectorAll('.collection-card')];
      const filters=[...document.querySelectorAll('.filter-btn')];
      const search=document.getElementById('collectionSearch');
      const sort=document.getElementById('catalogSort');
      const count=document.getElementById('collectionCount');
      const empty=document.getElementById('collectionEmpty');
      let activeFilter='all';

      const reduceProductMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if(!reduceProductMotion&&window.matchMedia('(pointer:fine)').matches){
        cards.forEach(card=>{
          let tiltFrame;
          card.addEventListener('pointermove',event=>{
            cancelAnimationFrame(tiltFrame);
            tiltFrame=requestAnimationFrame(()=>{
              const rect=card.getBoundingClientRect();
              const x=(event.clientX-rect.left)/rect.width-.5;
              const y=(event.clientY-rect.top)/rect.height-.5;
              card.style.setProperty('--tilt-x',`${(-y*2.2).toFixed(2)}deg`);
              card.style.setProperty('--tilt-y',`${(x*2.2).toFixed(2)}deg`);
            });
          });
          card.addEventListener('pointerleave',()=>{
            cancelAnimationFrame(tiltFrame);
            card.style.setProperty('--tilt-x','0deg');
            card.style.setProperty('--tilt-y','0deg');
          });
        });
      }

      const normalize=value=>value.toLocaleLowerCase('th').trim();
      const renderCollection=()=>{
        const query=normalize(search?.value||'');
        let visible=0;
        const ordered=[...cards].sort((a,b)=>{
          if(sort?.value==='name-asc')return a.dataset.productName.localeCompare(b.dataset.productName,'th');
          if(sort?.value==='name-desc')return b.dataset.productName.localeCompare(a.dataset.productName,'th');
          return Number(a.dataset.productIndex)-Number(b.dataset.productIndex);
        });
        ordered.forEach(card=>card.parentElement?.append(card));
        cards.forEach(card=>{
          const inCategory=activeFilter==='all'||card.dataset.category===activeFilter;
          const haystack=normalize(card.textContent+' '+(card.dataset.keywords||''));
          const show=inCategory&&(!query||haystack.includes(query));
          card.classList.toggle('is-hidden',!show);
          card.setAttribute('aria-hidden',show?'false':'true');
          if(show)visible++;
        });
        if(count)count.textContent=`แสดง ${visible} จาก ${cards.length} สไตล์`;
        if(empty)empty.hidden=visible!==0;
      };

      const categoryCounts=cards.reduce((result,card)=>{
        result.all++;
        result[card.dataset.category]=(result[card.dataset.category]||0)+1;
        return result;
      },{all:0});
      document.querySelectorAll('[data-filter-count]').forEach(label=>{
        label.textContent=`(${categoryCounts[label.dataset.filterCount]||0})`;
      });

      filters.forEach(button=>{
        button.setAttribute('aria-pressed',button.classList.contains('is-active')?'true':'false');
        button.addEventListener('click',()=>{
          activeFilter=button.dataset.filter;
          filters.forEach(item=>{
            const selected=item===button;
            item.classList.toggle('is-active',selected);
            item.setAttribute('aria-pressed',selected?'true':'false');
          });
          renderCollection();
        });
      });
      search?.addEventListener('input',renderCollection);
      sort?.addEventListener('change',renderCollection);
      renderCollection();

      const faqItems=[...document.querySelectorAll('.faq-list details')];
      faqItems.forEach(item=>item.addEventListener('toggle',()=>{
        if(!item.open)return;
        faqItems.forEach(other=>{if(other!==item)other.open=false});
      }));

      document.addEventListener('keydown',event=>{
        if(event.key!=='Escape')return;
        const mobileNav=document.querySelector('.mobile-nav');
        const menuButton=document.querySelector('.menu-btn');
        if(mobileNav?.classList.contains('open')){
          mobileNav.classList.remove('open');
          menuButton?.setAttribute('aria-expanded','false');
          if(menuButton)menuButton.textContent='☰';
          menuButton?.focus();
        }
      });

      if('IntersectionObserver' in window){
        const navLinks=[...document.querySelectorAll('.nav a[href^="#"]')];
        const sectionMap=new Map(navLinks.map(link=>[link.getAttribute('href').slice(1),link]));
        const activeObserver=new IntersectionObserver(entries=>{
          entries.forEach(entry=>{
            if(!entry.isIntersecting)return;
            navLinks.forEach(link=>link.removeAttribute('aria-current'));
            sectionMap.get(entry.target.id)?.setAttribute('aria-current','location');
          });
        },{rootMargin:'-35% 0px -55% 0px',threshold:0});
        sectionMap.forEach((_,id)=>{
          const section=document.getElementById(id);
          if(section)activeObserver.observe(section);
        });
      }
    })();

    (()=>{
      const section=document.querySelector('[data-precision-motion]');
      if(!section)return;
      const optic=section.querySelector('.optic');
      const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      section.classList.add('is-motion-ready');

      const activate=()=>section.classList.add('is-active');
      if(reduceMotion||!('IntersectionObserver' in window))activate();
      else{
        const precisionObserver=new IntersectionObserver(entries=>{
          if(!entries.some(entry=>entry.isIntersecting))return;
          activate();
          precisionObserver.disconnect();
        },{threshold:.24});
        precisionObserver.observe(section);
      }

      if(!reduceMotion&&optic&&window.matchMedia('(pointer:fine)').matches){
        optic.addEventListener('pointermove',event=>{
          const rect=optic.getBoundingClientRect();
          const x=((event.clientX-rect.left)/rect.width-.5)*14;
          const y=((event.clientY-rect.top)/rect.height-.5)*14;
          optic.style.setProperty('--optic-x',`${x.toFixed(2)}px`);
          optic.style.setProperty('--optic-y',`${y.toFixed(2)}px`);
        });
        optic.addEventListener('pointerleave',()=>{
          optic.style.setProperty('--optic-x','0px');
          optic.style.setProperty('--optic-y','0px');
        });
      }
    })();

    (()=>{
      const sections=[...document.querySelectorAll('[data-luxury-motion]')];
      if(!sections.length)return;
      const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      sections.forEach(section=>section.classList.add('motion-ready'));

      const activate=section=>{
        requestAnimationFrame(()=>section.classList.add('motion-in'));
      };

      if(reduceMotion||!('IntersectionObserver' in window)){
        sections.forEach(activate);
        return;
      }

      const motionObserver=new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
          if(!entry.isIntersecting)return;
          activate(entry.target);
          motionObserver.unobserve(entry.target);
        });
      },{threshold:.14,rootMargin:'0px 0px -9% 0px'});

      sections.forEach(section=>motionObserver.observe(section));
    })();
