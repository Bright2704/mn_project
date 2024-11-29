"use client"

import React from 'react'
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SideBar2 from './components/side/SideBar_Admin'
import AnnouncementBar from './components/announcement/AnnouncementBar'


function AdminPage() {

  // const router = useRouter();
  // const { data: session } = useSession();
  // if (!session) router.replace("/unauthorized")
  // if (session?.user?.role == "user") router.replace("/unauthorized")

  return (
    <div>admin page Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente rerum praesentium culpa reprehenderit facilis sequi libero quas? Quae sequi nostrum ipsa aspernatur tenetur similique rerum velit est impedit id ut facilis natus fuga doloremque voluptate dignissimos ab saepe consequatur, debitis itaque deserunt? Doloribus exercitationem molestiae, numquam accusamus harum praesentium, corrupti hic minus nesciunt, labore ea omnis mollitia. Repellat, ducimus! Quos autem, sunt magni ipsum earum repellat culpa cumque enim expedita dolore praesentium, sint suscipit eveniet totam eligendi minus delectus et voluptate soluta. Laborum deserunt sit ex perspiciatis ipsum totam sint tempore dicta unde amet, nisi asperiores officia sequi corrupti quos distinctio excepturi. Asperiores quod explicabo est eveniet voluptates. Quis placeat expedita deserunt, ullam reprehenderit praesentium itaque nam assumenda eum asperiores provident minus earum error numquam tenetur! Similique commodi eum quod quae pariatur, fuga illum maxime nulla esse dolorem rerum molestiae iste animi praesentium, distinctio aspernatur corporis iure consequuntur expedita quia accusamus vitae minus? At, incidunt rerum? Maiores illum nemo animi provident laboriosam tenetur inventore voluptas qui voluptates, atque itaque natus dignissimos fuga non aut magnam saepe, numquam placeat quas accusamus magni voluptatum deleniti suscipit! Deserunt quam voluptates fugit aspernatur, laborum eius voluptas odit at, tempora laudantium sapiente debitis eligendi accusantium eum. Hic architecto mollitia tempora, voluptatem fugit non dignissimos neque nihil ducimus, deserunt harum laborum nobis eum! Aliquid animi nesciunt quidem harum ratione beatae, quod quis nostrum ut blanditiis maxime inventore tenetur praesentium fugiat quibusdam eveniet qui deserunt unde. Eligendi itaque sed dolor sit facere, labore at delectus sint commodi similique error deleniti qui atque voluptatibus repellendus dolorum dolore. Quos libero ab esse voluptate illo molestiae consequatur nulla exercitationem aliquam, molestias cupiditate quae nam labore corporis sint possimus commodi! Necessitatibus dolor accusantium, officia similique, consectetur praesentium velit animi neque quisquam doloribus corrupti! Obcaecati laboriosam autem repellat aliquam sint assumenda, saepe possimus quibusdam eius ea voluptatibus, eum aut iste, nostrum doloremque laudantium. Enim ipsam adipisci recusandae dolorum modi molestias vero autem veritatis, excepturi temporibus perspiciatis, voluptatem quaerat reiciendis doloribus debitis libero, officia rerum. Ipsam sit, voluptate provident veniam cumque rem odit perspiciatis, nam quam dignissimos laboriosam ratione asperiores fugit reprehenderit ipsa illo quis. Maxime impedit blanditiis aliquid. Molestiae odit veniam sequi doloribus ad tempore totam. Veritatis nisi vero corrupti aut facilis aspernatur cumque temporibus deserunt tenetur sint rerum voluptas tempora, dignissimos iusto pariatur ut sit nihil ducimus nulla fugit et molestiae consequuntur inventore! Nisi quibusdam earum reiciendis laudantium suscipit error, minus, nulla quas beatae sunt officia voluptatibus in saepe velit sequi optio hic animi commodi dolores sint porro nobis. Incidunt nostrum eaque asperiores ex vitae. Consequatur assumenda recusandae obcaecati, architecto, corrupti beatae odit quod id rem asperiores nam voluptatem. Maxime iusto obcaecati eos mollitia, ex ullam quod dolorum veritatis quisquam doloribus cum dicta maiores repudiandae distinctio soluta accusantium rerum, laboriosam laborum, aliquid temporibus ratione numquam sunt! Enim numquam adipisci repudiandae maiores id explicabo incidunt minima reiciendis minus itaque tenetur vel hic, veniam quidem? Ex, corporis a corrupti expedita sed culpa, quo esse praesentium voluptatibus minima, earum quos dolores perferendis sapiente at iure sequi quam labore in voluptatum placeat debitis! Voluptate ab consectetur optio repellendus dolore dolorum omnis officiis alias eum, totam, tempora pariatur id excepturi quaerat veniam deserunt, facilis ut numquam reprehenderit distinctio cumque cum temporibus sapiente eveniet! Dignissimos, excepturi cumque! Beatae, vel voluptas. Ut minima deleniti, laudantium inventore cum tempora obcaecati nisi itaque ipsa vitae eveniet natus possimus impedit eaque corrupti ad suscipit consequatur incidunt quos veniam culpa ea explicabo! Voluptatem quia eos sunt perspiciatis odio illo ab, a dolore non suscipit repudiandae ea accusantium exercitationem. Quae maxime deserunt tenetur voluptates dolorem aliquam sint modi sapiente unde officia. Voluptas ipsam rem iure nihil quibusdam voluptatum iste dolore blanditiis ut sunt. Suscipit voluptatum quis autem facilis nihil perferendis quidem temporibus obcaecati qui. Aperiam mollitia tenetur animi sit minus distinctio id maiores veritatis esse commodi quam amet totam, nobis possimus enim sunt, unde veniam. Dolores deserunt minima sunt voluptatibus aliquam! Suscipit nulla blanditiis accusantium at numquam beatae sed, quas ratione repellendus earum quos natus dolorum adipisci sapiente maiores expedita ex iste mollitia? Voluptatem debitis architecto omnis vitae iusto illum adipisci saepe eum quisquam ex cumque, enim sint veniam totam minima minus mollitia impedit reprehenderit officiis consequuntur, temporibus quidem nostrum magnam ea. Nesciunt temporibus iste voluptatum repudiandae officia! Et nulla ullam voluptates quas officiis numquam inventore atque? Doloremque nulla labore, architecto in perspiciatis molestiae, sed asperiores vitae aspernatur officiis quo error. A et quo perspiciatis distinctio ex aliquam. Saepe temporibus animi voluptate mollitia! Accusamus, non ratione animi vel nulla soluta debitis, nihil dolores magni esse nobis, molestiae velit molestias accusantium. Optio dolorum laboriosam odio neque! Eaque quae sequi neque magnam accusantium rerum ut omnis, eligendi ducimus architecto expedita cupiditate dignissimos impedit pariatur fugit cumque, quod in minima nam eum enim quo consequatur? Ea odit, dolorem eligendi error, laboriosam commodi optio corrupti maiores repellat pariatur dolores blanditiis animi voluptatem, fuga accusantium officiis aliquam rerum nulla deserunt. Fugiat molestias suscipit error, molestiae placeat, voluptate alias enim esse iusto voluptas quos. Deserunt commodi repellat, quis, quasi similique voluptatibus ratione id earum est illo a nihil nostrum in? Itaque ipsa quis natus molestiae facilis autem animi quisquam atque neque facere? Recusandae totam alias suscipit eum error quo obcaecati. Saepe laboriosam ducimus, unde dolorem perspiciatis at quasi, repellat similique suscipit iure assumenda labore quidem architecto voluptatibus nemo eligendi. At sed perspiciatis quas modi cum vero odit asperiores ad accusantium laboriosam non, fugit dolor ducimus ullam suscipit omnis, beatae impedit deleniti velit quam ab aperiam. Et libero animi inventore beatae! Quidem enim nemo minima assumenda fugiat odit nostrum dignissimos quod neque voluptas laudantium alias, modi obcaecati aliquam? Perferendis explicabo, quidem culpa error corrupti repudiandae, possimus vitae accusamus hic placeat cum repellat sunt corporis laborum illum! Eaque optio odit quia nihil distinctio, assumenda commodi nobis aliquid. Eum aspernatur nobis, nostrum quasi vel quibusdam dolore? Ad, eius ullam! Culpa esse ad assumenda impedit porro, ducimus enim. Adipisci aspernatur eveniet repudiandae beatae! A facere deleniti eius accusantium sunt voluptas officia laudantium soluta incidunt totam commodi tempore similique, tenetur corrupti quas saepe provident.</div>
  )
}

export default AdminPage
