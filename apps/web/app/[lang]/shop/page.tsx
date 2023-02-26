import Image from 'next/image'
import Link from 'next/link'
import { rgbToDataUrl } from '@okkino/web/utils-shared'
import { webEnv } from '../../../environments/environment'
import { gql } from '../../../data-access/graphq-client'

const { storage } = webEnv
export default async function Page() {
  const { products } = await gql.GetProducts()

  return (
    <div className="grid gap-4 lg:grid-cols-2 lg:gap-7 xl:gap-12">
      {products.map((block) => {
        console.log(block.coverImage.imagePath)
        const { r, g, b } = block.coverImage.rgbBackground
        return (
          <Link
            href={block.id}
            key={block.id}
            className="flex h-[calc(50vh-5.5rem)] min-h-[232px] items-center justify-center gap-4 overflow-hidden sm:h-[auto] md:h-[calc(50vh-7.5rem)] lg:h-[calc(100vh-18rem)]"
          >
            <Image
              src={`${storage.url}/${block.coverImage.imagePath}`}
              alt={block.coverImage.title}
              height={774}
              width={774}
              className={
                'hover:transition-{scale} h-full object-cover duration-1000 hover:scale-105'
              }
              placeholder="blur"
              blurDataURL={rgbToDataUrl(r, g, b)}
              title={block.name}
            ></Image>
          </Link>
        )
      })}
    </div>
  )
}
